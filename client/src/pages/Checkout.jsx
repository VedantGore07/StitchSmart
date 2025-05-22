import React, { useState } from "react";

const Checkout = ({ item, measurements, price, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [error, setError] = useState("");

  const validatePayment = () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return false;
    }
    if (paymentMethod === "upi" && !upiId) {
      setError("Please enter your UPI ID.");
      return false;
    }
    if (
      paymentMethod === "card" &&
      (!cardNumber || !cardExpiry || !cardCVC)
    ) {
      setError("Please enter all card details.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    // Simulate payment success
    alert("Payment Successful! Generating your bill and sending to WhatsApp...");
    
    // Call the parent callback or trigger backend action here
    onPaymentSuccess && onPaymentSuccess();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Order Summary</h3>
        <p>Item: {item.name}</p>
        <p>Price: ₹{price}</p>
        <h4 className="mt-3 font-semibold">Measurements:</h4>
        <ul className="list-disc list-inside">
          {Object.entries(measurements).map(([key, value]) => (
            <li key={key}>{key}: {value} cm</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="font-semibold text-lg mb-3">Select Payment Method</h3>
        <div className="mb-4 flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
              className="form-radio"
            />
            UPI
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="form-radio"
            />
            Credit/Debit Card
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="form-radio"
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "upi" && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Enter UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              className="w-full p-2 border rounded"
              required={paymentMethod === "upi"}
            />
          </div>
        )}

        {paymentMethod === "card" && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded"
                maxLength={16}
                required={paymentMethod === "card"}
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Expiry Date</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded"
                  maxLength={5}
                  required={paymentMethod === "card"}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">CVC</label>
                <input
                  type="text"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                  placeholder="123"
                  className="w-full p-2 border rounded"
                  maxLength={3}
                  required={paymentMethod === "card"}
                />
              </div>
            </div>
          </>
        )}

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
        >
          Pay ₹{price}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
