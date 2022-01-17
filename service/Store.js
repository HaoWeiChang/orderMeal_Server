const db = require("../mysql/db.js");

class Store {
  constructor({ name, phone, address }) {
    this.name = name;
    this.phone = phone;
    this.address = address;
  }
  async Create() {
    let sql = `select 1 from store
    where store_name ='${this.name}'`;
    let isStoreExist = await db.execute(sql).then(([result]) => {
      return result[0];
    });
    if (isStoreExist != null) {
      throw `${this.name} has bean created`;
    }
    sql = `insert into store(
        store_name,
        store_phone,
        store_address
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
    let sql = `Select 
    store_id as id,
    store_name as name,
    store_phone as phone,
    store_address  as address 
    From store Where store_valid = True`;
    return await db.execute(sql).then(([result]) => result);
  }

  static async Get(id) {
    let sql = `select
    store_id as id,
    store_name as name,
    store_phone as phone,
    store_address  as address 
    from store
    where store_id = ? AND store_valid = ?`;
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
      meal_name,
      meal_price,
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
    let sql = `select 
    meal_id as id,
    meal_name as name,
    meal_price as price,
    meal_note as note
    from meal where store_id=?`;
    return await db.execute(sql, [store_id]).then(([result]) => result);
  }
}

module.exports = { Store, Meal };
