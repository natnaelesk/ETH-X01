import { useCallback, useEffect, useState } from "react";
import { login as loginRequest, signup as signupRequest } from "@/features/auth/api";

const STORAGE_KEY = "ethx01.mock-session";
const SESSION_EVENT = "ethx01:session-change";

function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function emitSessionChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(readStoredSession());
    setLoading(false);

    const syncSession = () => {
      setSession(readStoredSession());
    };

    window.addEventListener(SESSION_EVENT, syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener(SESSION_EVENT, syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  const applySession = useCallback((nextSession) => {
    persistSession(nextSession);
    emitSessionChange();
    setSession(nextSession);
    return nextSession;
  }, []);

  const login = useCallback(async (credentials) => {
    const nextSession = await loginRequest(credentials);
    return applySession(nextSession);
  }, [applySession]);

  const signup = useCallback(async (credentials) => {
    const nextSession = await signupRequest(credentials);
    return applySession(nextSession);
  }, [applySession]);

  const logout = useCallback(() => {
    applySession(null);
  }, [applySession]);

  return {
    user: session?.user || null,
    session,
    loading,
    isAuthenticated: Boolean(session?.user),
    login,
    signup,
    logout,
  };
}
