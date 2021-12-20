const db = require('../mysql/db.js')

class Store {
  constructor({ name, phone, address }) {
    this.name = name
    this.phone = phone
    this.address = address
  }
  async Create() {
    let sql = `select 1 from store
    where name ='${this.name}' AND valid=${true}`
    let isStoreExist = await db.execute(sql).then(([result, field]) => {
      return result[0]
    })
    if (isStoreExist != null) {
      throw `${this.name} has bean created`
    }
    sql = `insert into store(
        name,
        phone,
        address
      )
      values(
        '${this.name}',
        '${this.phone}',
        '${this.address}'
      )`
    return db.execute(sql)
  }
  async Delete() {}
}
class Category {}
class Meal {
  constructor({ store, name, price, category }) {
    this.name = name
    this.price = price
    this.category = category
  }
}

const FindStore = async ({ name, phone }) => {
  let condition = ``
  if (name) condition = `where`
  if (phone) condition = ``
  let sql = `select *`
}
module.exports = { Store }
