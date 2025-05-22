import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
    fetchItems();
  }, [user]);

  if (!user || !user.isAdmin) return <div>Access Denied</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p>No orders.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border p-3 rounded mb-2 flex justify-between"
            >
              <div>
                <p>
                  <strong>User:</strong> {order.userName || order.userId}
                </p>
                <p>
                  <strong>Item:</strong> {order.itemName || order.itemId}
                </p>
                <p>
                  <strong>Status:</strong> {order.status || "Pending"}
                </p>
              </div>
              {/* Add buttons to update order status if needed */}
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Items</h2>
        {items.length === 0 ? (
          <p>No items.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="border p-3 rounded mb-2 flex justify-between"
            >
              <p>{item.name}</p>
              {/* Add edit/delete buttons here */}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
