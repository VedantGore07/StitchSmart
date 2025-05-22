import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, loginUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        { name, phone, email },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setMessage("Profile updated successfully");
      loginUser(res.data.token); // update token info if returned
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {message && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Full Name"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Phone"
        />
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
