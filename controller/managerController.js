const db = require("../mysql/db");
const date_fns = require("date-fns");

exports.GetUserList = async (req, res) => {
  try {
    if (req.session.data.id !== 6) throw Error("非後臺帳號");
    const sql_user = `SELECT id,email,name,createTime,valid FROM ordermeal.account`;
    const sql_count = `SELECT 
      Count(email) as total_User,
      Count(valid = 1) as validUser,
      sum(valid = 0) as InvalidUser
      FROM ordermeal.account`;
    const userList = db.execute(sql_user).then(([result]) => {
      return { result };
    });
    const statistics = db.execute(sql_count).then(([result]) => {
      return { result, totalNum: result.length };
    });

    res.status(200).json({
      message: "成功",
      result: {
        userList: await userList,
        statistics: await statistics,
      },
    });
  } catch (error) {
    return res.status(401).send(error);
  }
};
