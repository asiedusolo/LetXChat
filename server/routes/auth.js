const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendVerificationEmail, sendInvitationEmail } = require("../utils/email");
const ChatRoom = require("../models/ChatRoom");
const Invitation = require('../models/Invitation')
const crypto = require('crypto')
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {

    const emailExists = await User.exists({
      staff_email: req.body.staff_email,
    });
    const usernameExists = await User.exists({ username: req.body.username });
    if (emailExists || usernameExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPswd = await bcrypt.hash(req.body.password, salt);

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verificationTokenExpires = new Date()
    verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 24)

    const newUser = new User({
      name: req.body.name,
      employee_id: req.body.employee_id,
      username: req.body.username,
      staff_email: req.body.staff_email,
      password: hashedPswd,
      verificationToken: verificationToken,
      verificationTokenExpires: verificationTokenExpires
    });

    const user = await newUser.save();

    const pendingInvitations = await Invitation.find({
      email: user.staff_email,
      status: 'pending',
      expiresAt: { $gt: new Date() }
    })

    if (pendingInvitations.length > 0) {
      const updatePromises = pendingInvitations.map(async (invitation) => {
        const userIdString = user._id.toString()

        await ChatRoom.findOneAndUpdate(
          { _id: invitation.chatRoomId },
          {
            $addToSet: {
              members: userIdString
            }
          },
          { new: true }
        );

        invitation.status = 'accepted';
        await invitation.save();
      });

      await Promise.all(updatePromises)
    }

    const emailSent = await sendVerificationEmail(user.staff_email, verificationToken)
    if (!emailSent) {
      console.error("Failed to send verification email")
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error)
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ staff_email: req.body.staff_email });
    if (!user) {
      return res
        .status(404)
        .json({
          msg: `No user with staff email ${req.body.staff_email} found`,
        });
    }

    if (!user.isVerified) {
      return res.status(403).json({ msg: "Please verify your email before logging in" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(404).json({ msg: "Wrong password" });
    }

    const { password, verificationToken, verificationTokenExpires, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    console.log(`Verification token received: ${token}`);

    const userWithToken = await User.findOne({ verificationToken: token });

    if (!userWithToken) {
      console.log('No user found with this token');
      return res.status(400).json({
        msg: "Invalid verification token",
        invalidToken: true
      });
    }

    if (userWithToken.isVerified) {
      console.log('User already verified');
      userWithToken.verificationToken = undefined;
      userWithToken.verificationTokenExpires = undefined;
      return res.status(200).json({
        msg: "Email already verified",
        alreadyVerified: true
      });
    }

    if (userWithToken.verificationTokenExpires < new Date()) {
      console.log('Token expired');
      return res.status(400).json({
        msg: "Verification token has expired",
        expiredToken: true
      });
    }

    userWithToken.isVerified = true;

    await userWithToken.save();

    console.log('User verified successfully');
    res.status(200).json({
      msg: "Email verified successfully",
      success: true
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      msg: "An error occurred during verification",
      error: error.message
    });
  }
});


router.post("/invite", async (req, res) => {

  try {
    const { inviterId, email, chatRoomId } = req.body
    console.log({ inviterId, email, chatRoomId })

    const inviter = await User.findById(inviterId)
    const chatRoom = await ChatRoom.findById(chatRoomId)

    if (!inviter || !chatRoom) {
      return res.status(404).json({ msg: "Invalid inviter or chat room " })
    }

    const existingUser = await User.findOne({ staff_email: email })

    const invitationToken = crypto.randomBytes(20).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    if (existingUser) {
      console.log('Existing mail')
      if (!existingUser.isVerified) {
        return res.status(400).json({ msg: "User exists but email is not verified " })
      }

      await ChatRoom.findByIdAndUpdate(chatRoomId, {
        $addToSet: { members: existingUser._id }
      })

      return res.status(200).json({ msg: "User added to chat room " })

    } else {
      console.log("Non existing mail")
      const newInvitation = new Invitation({
        email,
        token: invitationToken,
        inviterId,
        chatRoomId,
        expiresAt,
        status: 'pending'
      })
      console.log("AAAAAAAAAAAAAAAAAA")

      await newInvitation.save()
      console.log("BBBBBBBBBBBBBBBBBBBBB")
      const emailSent = await sendInvitationEmail(email, inviter.name, invitationToken)

      if (!emailSent) {
        await Invitation.deleteOne({ token: invitationToken })
        return res.status(500).json({ msg: "Failed to send invitation email" })
      }

      return res.status(200).json({
        msg: "Invitation sent successfully",
        invitationId: newInvitation._id
      })
    }

  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
