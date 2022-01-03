const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const router = express.Router();
const {
  CreateStore,
  CreateMeal,
  GetStoreList,
  GetStore,
  GetMeal,
} = require("../controller/storeController");

/* 商店相關 */
router.route("").all(Auth_Session).post(CreateStore).get(GetStoreList).delete();

router.route("/:id").all(Auth_Session).get(GetStore);

/* 食物相關 */
router.route("/meal").all(Auth_Session).post(CreateMeal);
router.route("/meal/:id").all(Auth_Session).get(GetMeal);

module.exports = router;
