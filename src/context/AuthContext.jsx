import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      authApi
        .me()
        .then((u) => setUser(u))
        .catch(() => {
          localStorage.removeItem("auth_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password });
    localStorage.setItem("auth_token", res.access_token);
    setUser(res.user);
    setShowAuth(false);
    return res.user;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const res = await authApi.signup({ name, email, password });
    localStorage.setItem("auth_token", res.access_token);
    setUser(res.user);
    setShowAuth(false);
    return res.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setUser(null);
  }, []);

  const openAuth = useCallback(() => setShowAuth(true), []);
  const closeAuth = useCallback(() => setShowAuth(false), []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, showAuth, openAuth, closeAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
