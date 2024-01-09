const jwt = require("jsonwebtoken");
const USER = require("../models/user");
const bcrypt = require("bcryptjs");
const { setToken } = require("../services/auth");

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const password = await bcrypt.hash(newUser.password, 12);

    const result = await USER.create({
      ...newUser,
      password: password,
    });
    const token = setToken(result);
    res.cookie("uid", token);
    res.redirect("/");
  } catch (error) {
    res.status(400).send(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const result = await USER.findOne({ email: email });
    if (!result) {
      res.status(400).send("user not found");
    }
    const isMatch = await bcrypt.compare(password, result.password);
    if (isMatch) {
      const token = setToken(result);
      res.cookie("uid", token);
      res.redirect("/");
    } else {
      res.status(400).send("password invaled ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createUser, loginUser };
