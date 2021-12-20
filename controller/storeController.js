const express = require('express')
const { Store } = require('../service/Store')

exports.CreateStore = async (req, res, next) => {
  try {
    let store = new Store(req.body)
    store = await store.Create()
    res.status(201).json({ message: `Create ${req.body.name}` })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
