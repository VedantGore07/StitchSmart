import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${user.id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone || "-"}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded shadow-sm flex justify-between"
              >
                <div>
                  <p>
                    <strong>Item:</strong> {order.itemName || order.itemId}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status || "Pending"}
                  </p>
                </div>
                <div>
                  {/* Add buttons for view/edit if needed */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
