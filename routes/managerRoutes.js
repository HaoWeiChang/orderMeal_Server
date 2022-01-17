const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const router = express.Router();
const {
  GetUserList,
  SQLCommand,
  GetStoreList,
} = require("../controller/managerController");

router.all(Auth_Session);

router.route("/userlist").get(GetUserList);
router.route("/sqlcommand").post(SQLCommand);
router.route("/storelist").get(GetStoreList).delete();
module.exports = router;
