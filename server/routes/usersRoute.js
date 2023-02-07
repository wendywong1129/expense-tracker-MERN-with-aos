const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async function (req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("Registered successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async function (req, res) {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      res.send(result);
    } else {
      res.status(500).json("Cannot find the user");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
