import { TodoInterface } from "@/@types/todo";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTodos = async (token: string): Promise<TodoInterface[]> => {
  const res = await axios.get(BACKEND + "/todo", {
    headers: { Authorization: "Bearer " + token },
  });

  return res.data;
};

export const createTodo = async (
  title: string,
  description: string,
  token: string
): Promise<TodoInterface> => {
  const res = await axios.post(
    BACKEND + "/todo",
    { title, description },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  return res.data;
};

export const updateTodo = async (
  id: string,
  title: string,
  description: string,
  token: string
): Promise<TodoInterface> => {
  const res = await axios.put(
    BACKEND + "/todo/" + id,
    { title, description },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  return res.data;
};

export const checkTodo = async (
  id: string,
  token: string
): Promise<boolean> => {
  try {
    const res = await axios.put(
      BACKEND + "/todo/check/" + id,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};

export const uncheckTodo = async (
  id: string,
  token: string
): Promise<boolean> => {
  try {
    const res = await axios.put(
      BACKEND + "/todo/uncheck/" + id,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};
