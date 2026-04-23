import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Check Auth from backend
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          // Set token so API interceptor can use it
          setToken(storedToken);
          
          const { data } = await API.get("/auth/me");
          setUser(data);
        } catch (error) {
          console.error("Auth check failed", error);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // ✅ LOGIN
  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user || data); // handle variations in login responses
    setToken(data.token);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        role: user?.role, // 🔥 central role
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);