import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../src/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const me = await apiFetch("/auth/me");
      setUser(me);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" })

    setUser(null);
  };

  const value = {
    user,
    refreshUser: fetchMe, 
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
