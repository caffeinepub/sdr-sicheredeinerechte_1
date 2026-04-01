import { type ReactNode, createContext, useContext, useState } from "react";

interface AuthUser {
  nickname: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (nickname: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem("sdr_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (nickname: string) => {
    const u = { nickname };
    setUser(u);
    sessionStorage.setItem("sdr_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("sdr_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
