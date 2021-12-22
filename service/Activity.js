const db = require('../mysql/db')

class Activity {
  constructor({ subject, store_id, user_id, createtime, endtime }) {
    this.subject = subject
    this.store_id = store_id
    this.creator = user_id
    this.createtime = createtime
    this.endtime = endtime
  }
  async Create() {
    let sql = `insert into activity(
      subject,
      store_id,
      creator,
      createtime,
      endtime
    )
    values(
      '${this.subject}',
      ${this.store_id},
      ${this.creator},
      '${this.createtime}',
      '${this.endtime}'
    )`
    return await db.execute(sql)
  }
  async Update() {}
  async delete() {}
}

class OrderMeal {
  constructor({ meals, orderer, activity }) {
    this.meals = meals
    this.orderer = orderer
    this.activity = activity
  }
  async Create() {
    let sqlvalues = []
    this.meals.forEach((e) => {
      sqlvalues.push([e.meal, e.price, e.num, this.orderer, this.activity])
    })
    let sql = `insert into ordermeal(
      meal,
      price,
      num,
      orderer,
      activity
    )values ?`
    return await db.query(sql, [sqlvalues])
  }
  static async Delete({ orderer, id }) {
    let sql = `DELETE FROM ordermeal where orderer = ? AND id=?`
    return await db.execute(sql, [orderer, id])
  }
}

module.exports = { Activity, OrderMeal }
