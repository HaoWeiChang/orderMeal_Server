const bcrypt = require("bcrypt");
const db = require("../mysql/db");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let sql = `select * from account where email='${email}'`;
    const verify = await db.execute(sql).then((result) => {
      return result[0];
    });
    if (verify == 0) return res.status(200).json({ message: "Email Invalid" });
    if (!bcrypt.compareSync(password, verify[0].password))
      return res.status(200).json({ message: "Password Invalid" });
    req.session.data = { id: verify[0].id, name: verify[0].name };
    res.status(201).json({
      message: "登入成功",
      result: req.session.data,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.Logout = async (req, res) => {
  try {
    await req.session.destroy((err) => {
      throw new Error("登出失敗");
    });
    res.status(203).json({ message: "登出成功" });
  } catch (error) {
    console.log(error);
  }
};
exports.LoginState = (req, res) => {
  if (!req.session.data) {
    res.status(200).json({ isLogin: false });
    return;
  }
  res.status(200).json({
    isLogin: true,
    result: req.session.data,
  });
};
