const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const router = express.Router();
const {
  CreateActivity,
  CreateOrders,
  GetActivity,
  DeleteActivity,
} = require("../controller/activityController");

router.route("/").get(GetActivity);
router.route("/").all(Auth_Session).post(CreateActivity).delete(DeleteActivity);

router.route("/order").all(Auth_Session).post(CreateOrders).get().delete();
//router.route("/order").get();
module.exports = router;
