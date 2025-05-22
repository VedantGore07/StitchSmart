import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const measurementFieldsByItem = {
  blazer: ["Chest", "Waist", "Shoulder", "Sleeve Length"],
  kurta: ["Chest", "Waist", "Length", "Sleeve Length"],
  pants: ["Waist", "Hip", "Length", "Inseam"],
  shirt: ["Chest", "Waist", "Sleeve Length", "Collar"],
  suit: ["Chest", "Waist", "Shoulder", "Sleeve Length", "Pant Length"],
};

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [measurements, setMeasurements] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(res.data);
        // initialize measurements with empty strings
        const fields =
          measurementFieldsByItem[res.data.name.toLowerCase()] || [];
        const initMeasure = {};
        fields.forEach((f) => (initMeasure[f] = ""));
        setMeasurements(initMeasure);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItem();
  }, [id]);

  const handleMeasurementChange = (field, value) => {
    setMeasurements({ ...measurements, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage("Please login to place an order.");
      return;
    }
    try {
      const orderPayload = {
        userId: user.id,
        itemId: id,
        measurements,
        paymentMethod,
        paymentInfo,
      };
      await axios.post("http://localhost:5000/api/orders", orderPayload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessage("Order placed successfully! Check your WhatsApp for bill.");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to place order");
    }
  };

  if (!item) return <div>Loading...</div>;

  const measurementFields =
    measurementFieldsByItem[item.name.toLowerCase()] || [];

  return (
    <div className="max-w-lg mx-auto p-4 border rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
      <p className="mb-4">{item.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="font-semibold mb-2">Measurements (in inches)</h2>
          {measurementFields.length === 0 && (
            <p>No measurement fields configured for this item.</p>
          )}
          {measurementFields.map((field) => (
            <input
              key={field}
              type="number"
              placeholder={field}
              required
              value={measurements[field]}
              onChange={(e) => handleMeasurementChange(field, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              min="0"
              step="0.1"
            />
          ))}
        </div>

        <div>
          <h2 className="font-semibold mb-2">Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
            <option value="netbanking">Net Banking</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <input
            type="text"
            placeholder={
              paymentMethod === "upi"
                ? "Enter UPI ID"
                : paymentMethod === "card"
                ? "Enter Card Number"
                : paymentMethod === "netbanking"
                ? "Enter Bank Account Number"
                : "Enter Contact Number"
            }
            required
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>

      {message && (
        <div className="mt-4 p-2 bg-blue-200 text-blue-800 rounded">{message}</div>
      )}
    </div>
  );
};

export default ItemDetails;
