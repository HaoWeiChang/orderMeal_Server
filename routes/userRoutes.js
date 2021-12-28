const express = require("express");
const { register, getAlluser } = require("../controller/userController");
const router = express.Router();

router.route("/account").post(register);

module.exports = router;
