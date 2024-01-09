const express = require("express");
const { createUrl, vistUrl, analizeUrl } = require("../controllers/url");

const router = express.Router();

router.route("/").post(createUrl);

router.route("/v/:id").get(vistUrl);

router.route("/a/:id").get(analizeUrl);

module.exports = router;
