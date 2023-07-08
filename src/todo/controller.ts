import { Request, Response } from "express";
import Todo, { TodoInterface } from "../models/Todo";

interface rUserInterface {
  userId: string;
  username: string;
  duration: number;
  iat: number;
  exp: number;
}

export const getTodos = async (req: Request, res: Response) => {
  const { userId } = req.user as rUserInterface;

  try {
    const todos = await Todo.find({ user: userId });
    return res.status(200).json(todos);
  } catch (err) {
    return res.status(500).json({ message: "failed to get todos" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { userId } = req.user as rUserInterface;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  const todo = new Todo({
    title,
    description,
    user: userId,
  });

  try {
    const createdTodo = await todo.save();
    return res.status(201).json(createdTodo);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const { userId } = req.user as rUserInterface;

  if (!title && !description) {
    return res.status(400).json({ message: "Incomplete information" });
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(updatedTodo);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user as rUserInterface;

  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete todo" });
  }
};

export const checkTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user as rUserInterface;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { checked: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo checked successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete todo" });
  }
};

export const uncheckTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user as rUserInterface;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { checked: false }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo unchecked successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete todo" });
  }
};
