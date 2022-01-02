const db = require("../mysql/db.js");

class Store {
  constructor({ name, phone, address }) {
    this.name = name;
    this.phone = phone;
    this.address = address;
  }
  async Create() {
    let sql = `select 1 from store
    where name ='${this.name}' AND valid=${true}`;
    let isStoreExist = await db.execute(sql).then(([result, field]) => {
      return result[0];
    });
    if (isStoreExist != null) {
      throw `${this.name} has bean created`;
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
      )`;
    return db.execute(sql);
  }
  async Delete() {}

  static async GetList() {
    let sql = `Select id,name,phone,address From store Where valid = True`;
    return await db.execute(sql).then(([result]) => result);
  }

  static async Get(id) {
    let sql = `select id, name, phone,address from store
    where id = ? AND valid = ?`;
    return await db.execute(sql, [id, true]).then(([result]) => result[0]);
  }
}
class Meal {
  constructor({ name, price, store_id }) {
    this.name = name;
    this.price = price;
    this.store_id = store_id;
  }
  async Create() {
    let sql = `insert into meal(
      name,
      price,
      store_id
    )
    values(
      '${this.name}',
      ${this.price},
      ${this.store_id}
    )`;
    return db.execute(sql);
  }
  static async Get(store_id) {
    let sql = `select * from meal where store_id=?`;
    return await db.execute(sql, [store_id]).then(([result]) => result);
  }
}

module.exports = { Store, Meal };
