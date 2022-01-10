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
      subject,
      store_id,
      user_id,
      createtime,
      endtime
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
    let sql = `select * from activity 
      where id=?`;
    return await db.execute(sql, [activityID]).then(([result]) => result[0]);
  }
  static async Delete({ id }, activityID) {
    let sql = `UPDATE activity
      Set Isdelete = TRUE 
      WHERE user_id = ?  AND id = ? AND Isdelete =FALSE`;
    return await db
      .execute(sql, [id, activityID])
      .then(([result]) => {
        return result.changedRows;
      })
      .catch((error) => error);
  }
  static async valid({ id }, { activityID, valid }) {
    let sql = `UPDATE activity
      Set valid = ? 
      WHERE user_id = ?  AND id = ? AND Isdelete =FALSE`;
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
      a.subject,
      a.store_id,
      s.name as storeName,
      a.user_id,
      u.name as initiator,
      a.createtime,
      a.endtime,
      h.id as historyID,
      a.id
      From account As u
      Join (Select * From activity) As a
      ON a.user_id = u.id AND a.endtime > ? 
      AND a.Isdelete = false AND a.valid = false
      left Join (select * From orderhistory) as h
      ON a.id = h.activity_id AND h.user_id = ?
      Join (Select * From store) As s
      ON s.id = a.store_id AND s.valid =True
      Group by a.id,h.id
      Order by a.endtime`;
    return await db.execute(sql, [date, userID]).then(([result]) => result);
  }
  static async GetHistory(user_id) {
    let sql = `select 
    a.*,
    u.name as userName,
    s.name as storeName 
    From activity as a
    Join(account as u,store as s)
    ON  a.user_id = ? AND a.user_id = u.id AND a.store_id = s.id
    Order by a.createTime desc`;
    return await db.execute(sql, [user_id]).then(([result]) => result);
  }
  static async GetContent(activityID) {
    let sql = `select 
      u.id as user_id,
      u.name as userName,
      GROUP_CONCAT(m.name) as mealName,
      GROUP_CONCAT(m.note) as mealNote,
      GROUP_CONCAT(m.price) as mealPrice,
      GROUP_CONCAT(om.num) as orderNum,
      CAST(SUM(m.price*om.num) as UNSIGNED) as needpay
      From orderhistory as oh
      Join (select * from ordermeal) as om
      ON oh.activity_id = ? AND oh.id = om.history_id AND oh.Isdelete = false
      Join (select * from meal) as m 
      ON m.id = om.meal_id
      Join (select * from account) as u
      ON u.id = oh.user_id
      Group by u.id`;
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
      num,
      user_id,
      activity_id,
      history_id
    )values ?`;
    return await db.query(sql, [sqlvalues]);
  }
  async CreateHistory() {
    const now = date_fns.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    console.log(now);
    let sql = `Insert Into orderhistory(
      user_id,
      activity_id,
      createtime
    )values(
      ${this.user_id},
      ${this.activity_id},
      '${now}'
    )`;
    return await db.execute(sql).then(([result]) => result.insertId);
  }
  static async GetHistory(user_id) {
    let sql = `Select
      h.id as historyID,
      h.activity_id as activityID,
      a.subject,
      u.name as userName,
      s.name as storeName,
      h.user_id as historyUserID,
      h.createTime,
      h.Isdelete as historyDelete,
      a.valid as activityValid,
      a.Isdelete as activityDelete
      From activity as a
      Left Join (Select id,name From store) as s
      On a.store_id = s. id 
      Join (Select id,name From account) as u
      On a.user_id = u.id
      Join (Select id,createtime,user_id,activity_id,Isdelete From orderhistory) as h
      On a.id = h.activity_id And h.user_id = ? AND h.Isdelete = false
      Order by h.createTime DESC`;
    return await db.execute(sql, [user_id]).then(([result]) => result);
  }
  static async Delete({ id }, historyID) {
    let sql = `Update orderhistory Set Isdelete = 1 where user_id = ? AND id=? AND Isdelete =false`;
    return await db.execute(sql, [id, historyID]);
  }
}

module.exports = {
  Activity,
  OrderMeal,
};
