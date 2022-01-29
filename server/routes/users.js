const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      req.body.password = await bcrypt.compare(req.body.password, salt);
    } catch (error) {
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ msg: `No user with id ${req.params.id} found` });
    }
    const { password, createdAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
