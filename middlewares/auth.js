const express = require("express");
const { getToken } = require("../services/auth");
const USER = require("../models/user");
const restrictToLoginUserOnly = async (req, res, next) => {
  const userToken = req.cookies?.uid;
  if (!userToken) {
    return res.redirect("/login");
  }
  const user = getToken(userToken);

  if (!user) {
    return res.redirect("/login");
  }
  const cruntUser = await USER.findOne({ _id: user.id });

  req.user = cruntUser;
  next();
};
const cheackAuth = async (req, res, next) => {
  const userToken = req.cookies?.uid;

  const user = getToken(userToken);
  if (user) {
    const cruntUser = await USER.findOne({ _id: user.id });
    req.user = cruntUser;
  } else {
    req.user = user;
  }

  next();
};

module.exports = { restrictToLoginUserOnly, cheackAuth };
