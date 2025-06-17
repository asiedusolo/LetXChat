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
        verificationToken,
        verificationTokenExpires
      });

      const user = await newUser.save();

      const pendingInvitations = await Invitation.find({
        email: user.staff_email,
        status: 'pending',
        expiresAt: { $gt: new Date() }
      })

      if(pendingInvitations.length > 0){
        const updatePromises = pendingInvitations.map(async (invitation) => {
          await ChatRoom.findByIdAndUpdate(
            invitation.chatRoomId,
            { $addToSet: { members: user._id }}
          )

          invitation.status = 'accepted'
          await invitation.save()
        })

        await Promise.all(updatePromises)
      }

      const emailSent = await sendVerificationEmail(user.staff_email, verificationToken)
      if(!emailSent){
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

    if(!user.isVerified){
      return res.status(403).json({ msg: "Please verify your email before logging in"});
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


router.get('/verify-email', async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    })

    if(!user){
      return res.status(400).json({ msg: "Invalid or expired verification token "})
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined

    await user.save()

    const pendingInvitations = await Invitation.find({ 
      email: user.staff_email,
      status: 'pending',
      expiresAt: { $gt: new Date() }
    });

    if (pendingInvitations.length > 0) {
      const updatePromises = pendingInvitations.map(async (invitation) => {
        await ChatRoom.findByIdAndUpdate(
          invitation.chatRoomId,
          { $addToSet: { members: user._id } }
        );
        
        invitation.status = 'accepted';
        await invitation.save();
      });

      await Promise.all(updatePromises);
    }

    res.status(200).json({ msg: "Email verified successfully"})
  } catch (error) {
    res.status(500).json(error)
  }
})


router.post("/invite", async (req, res) => {

  try {
    const { inviterId, email, chatRoomId } = req.body

    const inviter = await User.findById(inviterId)
    const chatRoom = await ChatRoom.findById(chatRoomId)

    if(!inviter || !chatRoom){
      return res.status(404).json({ msg: "Invalid inviter or chat room "})
    }

    const existingUser = await User.findOne({staff_email: email })

    const invitationToken = crypto.randomBytes(20).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    if(existingUser){

      if(!existingUser.isVerified){
        return res.status(400).json({ msg: "User exists but email is not verified "})
      }

      await ChatRoom.findByIdAndUpdate(chatRoomId, {
        $addToSet: { members: existingUser._id }
      })

      return res.status(200).json({ msg: "User added to chat room "})

    }else{
      const newInvitation = new Invitation({
        email,
        token: invitationToken,
        inviterId,
        ChatRoomId,
        expiresAt,
        status: 'pending'
      })

      await newInvitation.save()

      const emailSent = await sendInvitationEmail(email, inviter.name, invitationToken)

      if(!emailSent){
        await Invitation.deleteOne({token: invitationToken})
        return res.status(500).json({ msg: "Failed to send invitation email"})
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
