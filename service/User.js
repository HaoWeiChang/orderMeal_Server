const db = require('../mysql/db.js')
const bcrypt = require('bcrypt')
class User {
  constructor(email, pwd, name) {
    this.email = email
    this.pwd = bcrypt.hashSync(pwd, 10)
    this.name = name
  }
  async register() {
    let d = new Date()
    let yyyy = d.getFullYear()
    let month = d.getMonth() + 1
    let date = d.getDate()
    let hours = d.getHours()
    let mins = d.getMinutes()
    let seconds = d.getSeconds()
    let createTime = `${yyyy}-${month}-${date} ${hours}:${mins}:${seconds}`
    let sql = `insert into user(
      name,
      email,
      password,
      createTime
    )
    values(
      '${this.name}',
      '${this.email}',
      '${this.pwd}',
      '${createTime}'
    )`
    return db.execute(sql)
  }
  static is_Email_register(email) {
    let sql = `select 1 from user
    where email =?`
    return db.execute(sql, [email]).then(([result, field]) => {
      return result[0]
    })
  }
}

module.exports = { User }
