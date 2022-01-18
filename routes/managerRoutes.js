const express = require("express");
const { Manager_Auth_Sessiom } = require("../middleware/auth");
const router = express.Router();
const {
  GetUserList,
  SQLCommand,
  GetStoreList,
  SetStore,
  GetMeal,
  DeleteMeal,
} = require("../controller/managerController");
const { CreateStore, CreateMeal } = require("../controller/storeController");

router.route("/userlist").all(Manager_Auth_Sessiom).get(GetUserList);
router.route("/sqlcommand").all(Manager_Auth_Sessiom).post(SQLCommand);
router
  .route("/storelist")
  .all(Manager_Auth_Sessiom)
  .get(GetStoreList)
  .post(SetStore);
router.route("/store").all(Manager_Auth_Sessiom).post(CreateStore);
router
  .route("/meal/:id")
  .all(Manager_Auth_Sessiom)
  .post(CreateMeal)
  .get(GetMeal)
  .delete(DeleteMeal);
module.exports = router;
