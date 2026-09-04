import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEMO_USERS, NOTIFICATIONS, type Notification, type Role } from "./demo-data";

interface SessionValue {
  role: Role | null;
  user: (typeof DEMO_USERS)[Role] | null;
  demoMode: boolean;
  notifications: Notification[];
  unread: number;
  signIn: (role: Role) => void;
  signOut: () => void;
  toggleDemoMode: () => void;
  markAllRead: () => void;
  toggleRead: (id: string) => void;
}

const SessionContext = createContext<SessionValue | null>(null);

const STORAGE_KEY = "krishirakshak.role";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [demoMode, setDemoMode] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Role | null;
    if (stored && stored in DEMO_USERS) setRole(stored);
  }, []);

  const signIn = useCallback((next: Role) => {
    setRole(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const signOut = useCallback(() => {
    setRole(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<SessionValue>(
    () => ({
      role,
      user: role ? DEMO_USERS[role] : null,
      demoMode,
      notifications,
      unread: notifications.filter((n) => !n.read).length,
      signIn,
      signOut,
      toggleDemoMode: () => setDemoMode((d) => !d),
      markAllRead: () => setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
      toggleRead: (id: string) =>
        setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: !n.read } : n))),
    }),
    [role, demoMode, notifications, signIn, signOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}
