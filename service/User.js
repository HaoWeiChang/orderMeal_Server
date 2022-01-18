const db = require("../mysql/db.js");
const bcrypt = require("bcrypt");
class account {
  constructor({ email, password, name }) {
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
    this.name = name;
  }
  async register() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let hours = d.getHours();
    let mins = d.getMinutes();
    let seconds = d.getSeconds();
    let createTime = `${yyyy}-${month}-${date} ${hours}:${mins}:${seconds}`;
    let sql = `insert into user(
      user_email,
      user_password,
      user_createtime,
      user_name
    )
    values(
      '${this.email}',
      '${this.password}',
      '${createTime}',
      '${this.name}'
    )`;
    return await db.execute(sql);
  }
  static async is_Email_register(email) {
    let sql = `select 1 from user
    where user_email =? AND user_valid =?`;
    return await db.execute(sql, [email, true]).then(([result]) => {
      return result[0];
    });
  }
}

module.exports = { account };
