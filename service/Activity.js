const db = require("../mysql/db");

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
  async Update() {}
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
  static async GetList() {
    const date = new Date();
    date.toString();
    let sql = `Select 
      a.id,
      a.subject,
      a.store_id,
      s.name as storeName,
      a.user_id,
      u.name as initiator,
      a.createtime,
      a.endtime
      From account As u 
      Join (Select * From activity Where Isdelete = false And endtime >?) As a 
        ON a.user_id = u.id
      Join (Select * From store Where valid = True) As s
        ON s.id = a.store_id
      Order by a.createtime DESC, a.endtime`;
    return await db.execute(sql, [date]).then(([result]) => result);
  }
  static async Get(activityID) {
    if (activityID == undefined) return Promise.reject("activityID不能為空值");
    let sql = `select * from activity 
      where id=? And valid =?`;
    return await db
      .execute(sql, [activityID, true])
      .then(([result]) => result[0]);
  }
}

class OrderMeal {
  constructor({ meals, user_id, activity_id }) {
    this.meals = meals;
    this.user_id = user_id;
    this.activity_id = activity_id;
  }
  async Create() {
    let sqlvalues = [];
    this.meals.forEach((e) => {
      sqlvalues.push([e.id, e.num, this.user_id, this.activity_id]);
    });
    let sql = `insert into ordermeal(
      meal_id,
      num,
      user_id,
      activity_id
    )values ?`;
    return await db.query(sql, [sqlvalues]);
  }
  async CreateHistory() {
    let sql = `Insert Into orderhistory(
      user_id,
      activity_id
    )values(
      ${this.user_id},
      ${this.activity_id}
    )`;
    db.execute(sql);
  }
  static async Delete({ user_id, id }) {
    let sql = `DELETE FROM ordermeal where user_id = ? AND id=?`;
    return await db.execute(sql, [user_id, id]);
  }
  static async GetHistory({ user_id, activity_id }) {
    let sql = `Select 1 From orderhistory where user_id = ? AND activity_id=?`;
    return await db
      .execute(sql, [user_id, activity_id])
      .then(([result]) => result.length);
  }
}

module.exports = {
  Activity,
  OrderMeal,
};
