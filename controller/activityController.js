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
    const userID = req.session.data !== undefined ? req.session.data.id : null;
    const response = await Activity.GetList(userID);
    res.json({ result: response });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.GetActivityContent = async (req, res) => {
  try {
    const activity = await Activity.GetContent(req.params.id);
    let totalPay = 0;
    const _activity = activity.map((item) => {
      const mealName = item.mealName.split(",");
      const mealPrice = item.mealPrice.split(",");
      const mealNote = item.mealNote.split(",");
      const orderNum = item.orderNum.split(",");
      let meal = [];
      totalPay += item.needpay;
      mealName.forEach((value, index) => {
        meal.push({
          name: mealName[index],
          price: mealPrice[index],
          note: (mealNote[index] = null ? "" : mealNote[index]),
          num: orderNum[index],
        });
      });
      return {
        userName: item.userName,
        meal,
        needPay: item.needpay,
      };
    });
    res.status(200).json({ result: { totalPay, activity: _activity } });
  } catch (error) {
    res.status(500).json(error);
    return error;
  }
};

exports.GetActivityHistory = async (req, res) => {
  try {
    const response = await Activity.GetHistory(req.session.data.id);
    res.status(200).json({ result: response });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.DeleteActivity = async (req, res) => {
  try {
    const response = await Activity.Delete(
      req.session.data,
      req.query.activityID
    );
    if (response !== 0) return res.status(204).json();
    else throw Error("??????????????????");
  } catch (error) {
    return res.status(404).json({ error });
  }
};

exports.validActivity = async (req, res) => {
  try {
    const activityID = req.params.id;
    const valid = req.body.valid;
    if (!valid || !activityID) {
      return res.status(400).json({ error: "request?????????" });
    }
    const response = await Activity.valid(req.session.data, {
      activityID,
      valid,
    });
    if (response === 0) throw Error("???????????????????????????");
    res.status(200).json({ message: "??????" });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

exports.CreateOrders = async (req, res, next) => {
  try {
    let order = new OrderMeal(req.body);

    const historyID = await order.CreateHistory();

    order = await order.Create(historyID);
    res.status(201).json({ message: "????????????" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.GetOrderMealHistory = async (req, res) => {
  try {
    const response = await OrderMeal.GetHistory(req.session.data.id);
    res.status(200).json({ result: response });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.DeleteOrders = async (req, res, next) => {
  try {
    const response = await OrderMeal.Delete(
      req.session.data,
      req.query.historyID
    );
    if (response !== 0) return res.status(204).json();
    else throw Error("??????????????????");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
