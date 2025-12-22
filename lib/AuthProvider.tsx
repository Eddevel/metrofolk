// lib/AuthProvider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "./auth";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);