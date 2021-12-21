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
      endtime,
    )
    values(
      ${this.subject}
      ${this.store_id}
      ${this.creator}
      ${this.createtime}
      ${this.endtime}
    )`
    return await db.execute(sql)
  }
  async Update() {}
  async delete() {}
}
const OrderMeal = async (meals) => {
  let sql = `insert into activity(
      meal,
      price,
      orderer,
      activity
    )values ?`
  return await db.execute(sql, meals)
}
