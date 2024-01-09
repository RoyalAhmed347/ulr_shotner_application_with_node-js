const express = require("express");
const URL = require("../models/url");
const restrictToLoginUserOnly = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allLinks = await URL.find({ createdBy: req.user.id });

  res.render("index", { allLinks });
});
router.route("/login").get((req, res) => {
  res.render("login");
});
router.route("/singup").get((req, res) => {
  res.render("singup");
});

module.exports = router;
