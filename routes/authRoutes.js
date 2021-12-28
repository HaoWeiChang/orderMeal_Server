const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const { Login, Logout } = require("../controller/authController");
const router = express.Router();

router.route("/Login").post(Login).delete(Logout);
module.exports = router;
