const express = require("express");
const { Login, Logout, LoginState } = require("../controller/authController");
const router = express.Router();

router.route("/login").post(Login).delete(Logout);
router.route("/valid").get(LoginState);
module.exports = router;
