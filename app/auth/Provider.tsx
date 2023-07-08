"use client";

import { UserContextType, UserInterface } from "@/@types/user";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { getUser, login as loginHandler } from "./handlers";

const AuthContext = createContext<UserContextType>({
  user: null,
  refreshUser: () => {},
  login: async () => null,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthContextProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<UserInterface | null>(null);

  const refreshUser = async () => {
    const token = Cookies.get("access_token");

    if (!token) return signOut();

    try {
      setUser(await getUser(token));
    } catch (err) {
      signOut();
    }
  };

  const login = async (username: string, password: string) => {
    const { user, error } = await loginHandler(username, password);

    if (!user) return error;

    Cookies.set("access_token", user?.token);
    setUser(user);
    return null;
  };

  const signOut = () => {
    Cookies.remove("access_token");
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
