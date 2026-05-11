// context/authcontext.js
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  // Restore user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthUser(null);
      return;
    }

    try {
      setAuthUser(JSON.parse(storedUser));
    } catch (_error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthUser(null);
    }
  }, []);

  const login = useCallback((user) => {
    const normalizedUser = {
      ...user,
      isPremium: Boolean(user?.isPremium),
      profileComplete: Boolean(user?.profileComplete),
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setAuthUser(normalizedUser);
  }, []);

  const updateUser = useCallback((patch) => {
    setAuthUser((current) => {
      const stored = current || JSON.parse(localStorage.getItem("user") || "null") || {};
      const nextUser = { ...stored, ...patch };
      localStorage.setItem("user", JSON.stringify(nextUser));
      return nextUser;
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
  }, []);

  const value = useMemo(
    () => ({ authUser, login, logout, updateUser }),
    [authUser, login, logout, updateUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
