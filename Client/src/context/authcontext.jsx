// context/authcontext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  // Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    const normalizedUser = {
      ...user,
      isPremium: Boolean(user?.isPremium),
      profileComplete: Boolean(user?.profileComplete),
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setAuthUser(normalizedUser);
  };

  const updateUser = (patch) => {
    setAuthUser((current) => {
      const stored = current || JSON.parse(localStorage.getItem("user") || "null") || {};
      const nextUser = { ...stored, ...patch };
      localStorage.setItem("user", JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
