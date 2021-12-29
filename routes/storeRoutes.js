const express = require("express");
const { Auth_Session } = require("../middleware/auth");
const router = express.Router();
const {
  CreateStore,
  CreateMeal,
  GetStoreList,
} = require("../controller/storeController");

router.route("/").get(GetStoreList);
router.route("/").all(Auth_Session).post(CreateStore).get().delete();

router.route("/meal").post(CreateMeal);

module.exports = router;
