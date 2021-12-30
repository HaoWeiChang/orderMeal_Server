const { account } = require("../service/User");

exports.register = async (req, res, next) => {
  try {
    let user = new account(req.body);
    let checkEmailregister = await account.is_Email_register(req.body.email);
    if (checkEmailregister != null) {
      return res.send("Email was register");
    }
    user = await user.register();
    res.status(201).json({ message: "register success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAlluser = async (req, res, next) => {
  res.send("you see the Alluser");
};
