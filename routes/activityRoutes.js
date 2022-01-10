const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const router = express.Router();
const {
  CreateActivity,
  GetActivity,
  GetActivityList,
  GetActivityContent,
  GetActivityHistory,
  DeleteActivity,
  validActivity,
  CreateOrders,
  GetOrderMealHistory,
  DeleteOrders,
} = require("../controller/activityController");

router.route("").get(GetActivityList);

router.route("").all(Auth_Session).post(CreateActivity).delete(DeleteActivity);
router
  .route("/:id/content")
  .all(Auth_Session)
  .get(GetActivityContent)
  .patch(validActivity);

router.route("/history").all(Auth_Session).get(GetActivityHistory);
router
  .route("/order")
  .all(Auth_Session)
  .post(CreateOrders)
  .delete(DeleteOrders);
router.route("/history/order").all(Auth_Session).get(GetOrderMealHistory);
router.route("/:id").all(Auth_Session).get(GetActivity);
module.exports = router;
