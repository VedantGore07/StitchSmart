import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodeToken = async (token) => {
      const jwt = await import("jwt-decode");
      const decoded = jwt.default(token);
      setUser({ ...decoded, token });
    };

    const token = localStorage.getItem("token");
    if (token) {
      decodeToken(token);
    }
  }, []);

  const loginUser = async (token) => {
    localStorage.setItem("token", token);
    const jwt = await import("jwt-decode");
    const decoded = jwt.default(token);
    setUser({ ...decoded, token });
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
