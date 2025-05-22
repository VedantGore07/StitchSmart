const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  measurements: Object,
  amount: Number,
  paid: Boolean,
  paymentMode: String,
  whatsappSent: { type: Boolean, default: false }
});

module.exports = mongoose.model("Order", orderSchema);
