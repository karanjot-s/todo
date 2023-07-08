import { TodoInterface } from "@/@types/todo";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";

export default function TodoForm({
  open,
  onClose,
  todo,
  createTodo,
  updateTodo,
}: {
  todo?: TodoInterface;
  open: boolean;
  onClose: () => void;
  createTodo: (
    title: string,
    description: string
  ) => Promise<TodoInterface | void>;
  updateTodo: (
    id: string,
    title: string,
    description: string
  ) => Promise<TodoInterface | void>;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDesc(todo.description);
    } else {
      setTitle("");
      setDesc("");
    }
  }, [todo]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={todo ? "Update Todo" : "Create Todo"}
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          todo ? updateTodo(todo._id, title, desc) : createTodo(title, desc);
          onClose();
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-green-200">
            Title:{" "}
          </label>
          <input
            className="text-lg px-4 py-2 border-green-300 border rounded-lg outline-green-600 transition"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-green-200">
            Description:{" "}
          </label>
          <textarea
            className="text-lg px-4 py-2 border-green-300 border rounded-lg outline-green-600 transition"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button
          className="mt-2 bg-green-500 text-green-50 hover:bg-green-600 transition py-2 px-4 rounded-lg"
          type="submit"
        >
          {todo ? "Update" : "Create"}
        </button>
        <button
          className="mt-2 bg-green-900 text-green-50 hover:bg-green-800 transition py-2 px-4 rounded-lg"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
      </form>
    </Dialog>
  );
}
