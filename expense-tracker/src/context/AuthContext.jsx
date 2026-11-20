import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const STORAGE_KEY = "campuskhata_user";

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const selectStudentType = (studentType) => {
    setUser((prev) => ({ ...prev, studentType }));
  };

  const signup = (details) => {
    setUser((prev) => ({
      ...prev,
      ...details,
      monthlyAllowance: Number(details.monthlyAllowance),
      isSignedUp: true,
    }));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, selectStudentType, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}