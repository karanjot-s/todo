import { UserInterface } from "@/@types/user";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (
  username: string,
  password: string
): Promise<{
  user: {
    token: string;
    _id: string;
    username: string;
    password: string;
  } | null;
  error: string | null;
}> => {
  const res = await axios.post(BACKEND + "/login", { username, password });

  if (res.status === 200) return { user: res.data, error: null };
  return { user: null, error: "" };
};

export const register = async (
  username: string,
  password: string
): Promise<{
  error: string | null;
}> => {
  const res = await axios.post(BACKEND + "/register", { username, password });

  if (res.status === 200) return { error: null };
  return { error: "" };
};

export const getUser = async (token: string) => {
  const res = await axios.get(BACKEND + "/user", {
    headers: { Authorization: "Bearer " + token },
  });

  if (res.status === 200 && res.data) return res.data;
  return null;
};
