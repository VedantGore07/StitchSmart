const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("userId").populate("itemId");
  res.json(orders);
};
