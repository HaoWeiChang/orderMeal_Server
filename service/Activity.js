const db = require("../mysql/db");
const date_fns = require("date-fns");

class Activity {
  constructor({ id }, { subject, store_id, createtime, endtime }) {
    this.subject = subject;
    this.store_id = store_id;
    this.user_id = id;
    this.createtime = createtime;
    this.endtime = endtime;
  }
  async Create() {
    let sql = `insert into activity(
      activity_subject,
      store_id,
      user_id,
      activity_createtime,
      activity_endtime
    )
    values(
      '${this.subject}',
      ${this.store_id},
      ${this.user_id},
      '${this.createtime}',
      '${this.endtime}'
    )`;
    return await db.execute(sql).then(([result]) => result.insertId);
  }
  static async Get(activityID) {
    if (activityID == undefined) return Promise.reject("activityID不能為空值");
    let sql = `select 
    activity_id as id,
    activity_subject as subject,
    activity_createtime as createtime,
    activity_endtime as endtime,
    activity_valid as valid,
    activity_delete as Isdelete,
    user_id,
    store_id
    from activity 
    where activity_id=?`;
    return await db.execute(sql, [activityID]).then(([result]) => result[0]);
  }
  static async Delete({ id }, activityID) {
    let sql = `UPDATE activity
      Set activity_delete = TRUE 
      WHERE user_id = ?  AND activity_id = ? AND activity_delete =FALSE`;
    return await db
      .execute(sql, [id, activityID])
      .then(([result]) => {
        return result.changedRows;
      })
      .catch((error) => error);
  }
  static async valid({ id }, { activityID, valid }) {
    let sql = `UPDATE activity
      Set activity_valid = ? 
      WHERE user_id = ?  AND activity_id = ? AND activity_delete =FALSE`;
    return await db
      .execute(sql, [valid, id, activityID])
      .then(([result]) => {
        return result.changedRows;
      })
      .catch((error) => error);
  }
  static async GetList(userID = null) {
    const date = new Date();
    let sql = `Select
      a.activity_subject as subject,
      a.store_id,
      s.store_name as storeName,
      a.user_id,
      u.user_name as initiator,
      a.activity_createtime as createtime,
      a.activity_endtime as endtime,
      r.record_id as historyID,
      a.activity_id as id
      From user As u
      Join (Select * From activity) As a
      ON a.user_id = u.user_id And a.activity_endtime > ?
      AND a.activity_delete = false AND a.activity_valid = false
      left Join (select * From record) as r
      ON a.activity_id = r.activity_id AND r.user_id = ? 
      And r.record_delete = false
      Join (Select * From store) As s
      ON s.store_id = a.store_id AND s.store_valid =True
      Group by a.activity_id,r.record_id
      Order by a.activity_endtime`;
    return await db.execute(sql, [date, userID]).then(([result]) => result);
  }
  static async GetHistory(user_id) {
    let sql = `select 
    a.activity_id as id,
    a.activity_subject as subject,
    a.activity_createtime as createTime,
    a.activity_endtime as endTime,
    a.activity_valid as valid,
    a.activity_delete as Isdelete,
    u.user_name as userName,
    s.store_name as storeName 
    From activity as a
    Join(user as u,store as s)
    ON  a.user_id = ? AND a.user_id = u.user_id AND a.store_id = s.store_id
    Order by a.activity_createtime desc`;
    return await db.execute(sql, [user_id]).then(([result]) => result);
  }
  static async GetContent(activityID) {
    let sql = `select 
      u.user_id as user_id,
      u.user_name as userName,
      GROUP_CONCAT(m.meal_name) as mealName,
      GROUP_CONCAT(m.meal_note) as mealNote,
      GROUP_CONCAT(m.meal_price) as mealPrice,
      GROUP_CONCAT(om.ordermeal_number) as orderNum,
      CAST(SUM(m.meal_price*om.ordermeal_number) as UNSIGNED) as needpay
      From record as r
      Join (select * from ordermeal) as om
      ON r.activity_id = ? AND r.record_id = om.record_id AND r.record_delete = false
      Join (select * from meal) as m 
      ON m.meal_id = om.meal_id
      Join (select * from user) as u
      ON u.user_id = r.user_id
      Group by u.user_id`;
    return await db.execute(sql, [activityID]).then(([result]) => result);
  }
}

class OrderMeal {
  constructor({ meals, user_id, activity_id }) {
    this.meals = meals;
    this.user_id = user_id;
    this.activity_id = activity_id;
  }
  async Create(historyID) {
    let sqlvalues = [];
    this.meals.forEach((e) => {
      sqlvalues.push([e.id, e.num, this.user_id, this.activity_id, historyID]);
    });
    let sql = `insert into ordermeal(
      meal_id,
      ordermeal_number,
      user_id,
      activity_id,
      record_id
    )values ?`;
    return await db.query(sql, [sqlvalues]);
  }
  async CreateHistory() {
    const now = date_fns.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    let sql = `Insert Into record(
      user_id,
      activity_id,
      record_createtime
    )values(
      ${this.user_id},
      ${this.activity_id},
      '${now}'
    )`;
    return await db.execute(sql).then(([result]) => result.insertId);
  }
  static async GetHistory(user_id) {
    let sql = `Select
  r.record_id as historyID,
  r.activity_id as activityID,
  r.user_id as historyUserID,
  r.record_createtime as createTime,
  r.record_delete as historyDelete,
  a.activity_subject as subject,
  a.activity_valid as activityValid,
  a.activity_delete as activityDelete,
  u.user_name as userName,
  s.store_name as storeName
  From activity a
  Left Join (Select * From store) s
  On a.store_id = s.store_id 
  Join (Select * From user) u
  On a.user_id = u.user_id
  Join (Select * From record) r
  On a.activity_id = r.activity_id And r.user_id = ? AND r.record_delete = false
  Order by r.record_createtime DESC`;
    return await db.execute(sql, [user_id]).then(([result]) => result);
  }
  static async Delete({ id }, historyID) {
    let sql = `Update record Set record_delete = 1 where user_id = ? AND record_id=? AND record_delete =false`;
    return await db.execute(sql, [id, historyID]);
  }
}

module.exports = {
  Activity,
  OrderMeal,
};
