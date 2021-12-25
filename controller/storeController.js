const express = require("express");
const { Store, Meal } = require("../service/Store");

exports.CreateStore = async (req, res, next) => {
  try {
    let store = new Store(req.body);
    store = await store.Create();
    res.status(201).json({ message: `Create ${req.body.name}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
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
