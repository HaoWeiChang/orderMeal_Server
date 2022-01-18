const { account } = require("../service/User");

exports.register = async (req, res, next) => {
  try {
    let user = new account(req.body);
    let checkEmailregister = await account.is_Email_register(req.body.email);
    if (checkEmailregister != null) {
      return res.json({ error: "信箱已註冊" });
    }
    const response = (await user.register())[0];
    res.status(201).json({ message: "註冊成功", result: response.insertId });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAlluser = async (req, res, next) => {
  res.send("you see the Alluser");
};
