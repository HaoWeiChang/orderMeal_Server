const { Activity, OrderMeal } = require("../service/Activity");

exports.CreateActivity = async (req, res, next) => {
  try {
    let activity = new Activity(req.session.data, req.body);
    const activityID = await activity.Create();
    res.status(201).json({
      message: `Create ${req.body.subject}`,
      result: {
        activityID,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.GetActivity = async (req, res) => {
  try {
    const activity = await Activity.Get(req.params.id);
    res.status(200).json({ result: activity });
  } catch (error) {
    res.status(500).json(error);
    return error;
  }
};

exports.GetActivityList = async (req, res) => {
  try {
    const response = await Activity.GetList();
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
