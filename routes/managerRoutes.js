const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const router = express.Router();
const { GetUserList } = require("../controller/managerController");

router.all(Auth_Session);

router.route("/userList").get(GetUserList);

module.exports = router;
