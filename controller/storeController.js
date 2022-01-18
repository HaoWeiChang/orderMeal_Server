const { Store, Meal } = require("../service/Store");

exports.CreateStore = async (req, res, next) => {
  try {
    let store = new Store(req.body);
    const response = await store.Create();
    res
      .status(201)
      .json({ message: `Create ${req.body.name}`, result: response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.GetStoreList = async (req, res) => {
  try {
    const storeList = await Store.GetList();
    res.status(200).json({ result: storeList });
  } catch (error) {
    return error;
  }
};
exports.GetStore = async (req, res) => {
  const store = await Store.Get(req.params.id);
  res.status(200).json({ result: store });
};

exports.CreateMeal = async (req, res, next) => {
  try {
    let meal = new Meal(req.body);
    meal = await meal.Create();
    res.status(201).json({ message: `餐點添加成功` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.GetMeal = async (req, res) => {
  const Getstore = Store.Get(req.params.id);
  const GetMeal = Meal.Get(req.params.id);
  const store = await Getstore;
  const meal = await GetMeal;
  res.status(200).json({ result: { store, meal } });
};
