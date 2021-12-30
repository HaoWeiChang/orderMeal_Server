const { Activity, OrderMeal, GetActivityfunc } = require("../service/Activity");

exports.CreateActivity = async (req, res, next) => {
  try {
    let activity = new Activity(req.session.data, req.body);
    activity = await activity.Create();
    res.status(201).json({ message: `Create ${req.body.subject}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.GetActivity = async (req, res) => {
  try {
    const response = await GetActivityfunc();
    res.json({ result: response });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.DeleteActivity = async (req, res) => {
  try {
    const response = await Activity.Delete(
      req.session.data,
      req.query.activityID
    );
    let result = {};
    if (response !== 0) result.success = "成功刪除";
    else result.error = "資料已經刪除";
    res.status(200).json(result);
  } catch (error) {
    return error;
  }
};

exports.CreateOrders = async (req, res, next) => {
  try {
    let order = new OrderMeal(req.body);
    order = await order.Create();
    res.status(201).json({ message: "添加成功" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.DeleteOrders = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
