const Item = require("../models/Item");

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.createItem = async (req, res) => {
  const { name, category, description, measurements } = req.body;
  const item = await Item.create({ name, category, description, measurements });
  res.status(201).json(item);
};
