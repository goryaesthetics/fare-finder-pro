import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type AuthUser = { email: string };

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const BACKEND_PENDING =
  "後端尚未連接 — Cloud backend is not connected yet, so sign-in is temporarily unavailable.";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signIn: async () => {
        throw new Error(BACKEND_PENDING);
      },
      signUp: async () => {
        throw new Error(BACKEND_PENDING);
      },
      signOut: async () => {
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
