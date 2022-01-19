const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPswd = await bcrypt.hash(req.body.password, salt);
    const emailExists = await User.exists({
      staff_email: req.body.staff_email,
    });
    const usernameExists = await User.exists({ username: req.body.username });
    if (emailExists || usernameExists) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        employee_id: req.body.employee_id,
        username: req.body.username,
        staff_email: req.body.staff_email,
        password: hashedPswd,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (error) {
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

    const existingPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!existingPassword) {
      return res.status(404).json({ msg: "Wrong password" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
