"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User, LoginRequest, RegisterRequest } from "@/types";
import { authApi, ApiClientError } from "@/lib/api";
import { getToken, setToken, removeToken, isTokenExpired } from "./token";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const token = getToken();

    if (!token || isTokenExpired(token)) {
      removeToken();
      setUser(null);
      setIsLoading(false);
      return false;
    }

    setIsLoading(false);
    return true;
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginRequest) => {
    const response = await authApi.login(data);
    setToken(response.token);
    setUser(response.user);
    router.push("/");
  };

  const register = async (data: RegisterRequest) => {
    const response = await authApi.register(data);
    setToken(response.token);
    setUser(response.user);
    router.push("/");
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!getToken() && !isTokenExpired(getToken() || ""),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
