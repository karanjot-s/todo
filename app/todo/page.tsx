"use client";

import Protected from "../auth/Protected";
import {
  checkTodo,
  createTodo,
  getTodos,
  uncheckTodo,
  updateTodo,
} from "./handlers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { TodoInterface } from "@/@types/todo";
import TodoForm from "../components/TodoForm";

export default function Todo() {
  const [todos, setTodos] = useState<TodoInterface[]>();
  const [formOpen, setFormOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoInterface>();
  console.log(todos);
  const token = Cookies.get("access_token");

  const loadTodos = (token: string) => {
    getTodos(token)
      .then((t) => {
        // console.log(t);
        setTodos(t);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (!token) return;
    loadTodos(token);
  }, [token]);

  return (
    <Protected>
      <button
        className="my-2 bg-green-900 text-green-50 hover:bg-green-950 transition py-2 px-4 rounded-lg"
        onClick={() => {
          setCurrentTodo(undefined);
          setFormOpen(true);
        }}
      >
        Create Todo
      </button>
      <p className="my-4">Your Todos: </p>
      <div className="flex flex-col items-start text-start gap-5">
        {todos &&
          todos.map((todo, i) => (
            <div
              className="flex flex-col items-start gap-1 cursor-pointer"
              key={i}
            >
              <span className="flex items-center justify-start gap-3">
                <input
                  className="w-6 h-6 border-green-500"
                  id={todo._id}
                  type="checkbox"
                  defaultChecked={todo.checked}
                  onChange={(e) => {
                    if (!token) return;
                    if (e.target.checked) {
                      checkTodo(todo._id, token);
                    } else {
                      uncheckTodo(todo._id, token);
                    }
                  }}
                />
                <h3
                  className={`text-lg ${todo.checked ? "line-through" : ""}`}
                  onClick={() => {
                    setCurrentTodo(todo);
                    setFormOpen(true);
                  }}
                >
                  {todo.title}
                </h3>
              </span>
              <p
                className={`${todo.checked ? "line-through" : ""}`}
                onClick={() => {
                  setCurrentTodo(todo);
                  setFormOpen(true);
                }}
              >
                {todo.description}
              </p>
            </div>
          ))}
      </div>
      {token && (
        <TodoForm
          todo={currentTodo}
          open={formOpen}
          createTodo={(title: string, description: string) =>
            createTodo(title, description, token).then(() => loadTodos(token))
          }
          updateTodo={(id: string, title: string, description: string) =>
            updateTodo(id, title, description, token).then(() =>
              loadTodos(token)
            )
          }
          onClose={() => {
            setFormOpen(false);
          }}
        />
      )}
    </Protected>
  );
}
