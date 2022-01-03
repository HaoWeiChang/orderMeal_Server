const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const router = express.Router();
const {
  CreateActivity,
  CreateOrders,
  GetActivity,
  GetActivityList,
  DeleteActivity,
} = require("../controller/activityController");

router.route("").get(GetActivityList);
router.route("").all(Auth_Session).post(CreateActivity).delete(DeleteActivity);
router.route("/:id").all(Auth_Session).get(GetActivity);

router.route("/order").all(Auth_Session).post(CreateOrders).get().delete();
//router.route("/order").get();
module.exports = router;
