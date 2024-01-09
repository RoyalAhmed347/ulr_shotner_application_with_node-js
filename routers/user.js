const express = require("express");
const { createUser, loginUser } = require ("../controllers/user");
const router = express.Router();

router.route("/singup").post(createUser);
router.route("/login").post(loginUser);




module.exports = router;
