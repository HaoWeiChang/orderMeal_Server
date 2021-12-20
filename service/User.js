const db = require('../mysql/db.js')
const bcrypt = require('bcrypt')
class account {
  constructor({ email, pwd, name, studentID }) {
    this.email = email
    this.pwd = bcrypt.hashSync(pwd, 10)
    this.name = name
    this.studentID = studentID
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
    let sql = `insert into account(
      email,
      password,
      createTime,
      valid
    )
    values(
      '${this.email}',
      '${this.pwd}',
      '${createTime}',
      ${true}
    )`
    return db.execute(sql)
  }
  static is_Email_register(email) {
    let sql = `select 1 from account
    where email =? AND valid =?`
    return db.execute(sql, [email, true]).then(([result, field]) => {
      return result[0]
    })
  }
}

module.exports = { account }
