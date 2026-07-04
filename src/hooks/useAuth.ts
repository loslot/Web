"use client";
import { useState, useEffect, useCallback } from "react";

interface User {
  name: string;
  email: string;
  country: string;
  joined: string;
}

let globalUser: User | null = null;
let authListeners: Array<() => void> = [];

function subscribeAuth(fn: () => void) {
  authListeners.push(fn);
  return () => { authListeners = authListeners.filter(l => l !== fn); };
}

function setGlobalUser(u: User | null) {
  globalUser = u;
  authListeners.forEach(l => l());
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => globalUser);

  useEffect(() => {
    return subscribeAuth(() => setUser(globalUser));
  }, []);

  const login = useCallback((name = "Alex Johnson", email = "alex@email.com") => {
    setGlobalUser({ name, email, country: "United States", joined: "January 2024" });
  }, []);

  const logout = useCallback(() => {
    setGlobalUser(null);
  }, []);

  const register = useCallback((name: string, email: string) => {
    setGlobalUser({ name, email, country: "United States", joined: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) });
  }, []);

  return { user, login, logout, register };
}
