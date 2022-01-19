const db = require("../mysql/db");
const date_fns = require("date-fns");

exports.GetUserList = async (req, res) => {
  try {
    const sql_user = `SELECT 
    *
    FROM user`;
    const sql_count = `SELECT 
      Count(user_email) as total_User,
      Count(user_valid = 1 or null) as validUser,
      Count(user_valid = 0 or null) as InvalidUser
      FROM user`;
    const userList = db.execute(sql_user).then(([result]) => result);
    const statistics = db.execute(sql_count).then(([result]) => result);
    res.status(200).json({
      message: "成功",
      result: {
        userList: await userList,
        statistics: await statistics,
      },
    });
  } catch (error) {
    return res.status(401).send(error);
  }
};

exports.GetStoreList = async (req, res) => {
  try {
    let sql = `SELECT 
    store.*,
    count(meal_name) as meal_number
    FROM store
    left join meal
    on store.store_id = meal.store_id
    group by store.store_id`;
    const response = (await db.execute(sql))[0];
    res.status(200).json({ result: response });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

exports.SetStore = async (req, res) => {
  try {
    const sql = `update store 
    Set store_valid = ${req.body.set}
    where store_id =${req.body.store_id}`;
    const response = (await db.execute(sql))[0];
    res.status(201).json({ result: response });
  } catch (error) {
    console.log(error);
  }
};

exports.GetMeal = async (req, res) => {
  try {
    const sql = `select * from meal
    where store_id =?`;
    const response = (await db.execute(sql, [req.params.id]))[0];
    res.status(201).json({ result: response });
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteMeal = async (req, res) => {
  try {
    const sql = `Delete from meal where meal_id = ?`;
    const response = (await db.execute(sql, [req.params.id]))[0];
    res.status(204).json({ result: response });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.SQLCommand = async (req, res) => {
  try {
    const response = (await db.execute(req.body.sql))[0];
    res.status(200).json({ result: response });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
