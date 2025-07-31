import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 16 }}>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="New to-do"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "70%", marginRight: 8, padding: 6 }}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
      />
      <button onClick={addTodo} style={{ padding: "6px 12px" }}>
        Add
      </button>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setFilter("all")}
          disabled={filter === "all"}
          style={{ marginRight: 8 }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
          style={{ marginRight: 8 }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>
      </div>

      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 16 }}>
        {filteredTodos.map(({ id, text, completed }) => (
          <li
            key={id}
            onClick={() => toggleTodo(id)}
            style={{
              cursor: "pointer",
              textDecoration: completed ? "line-through" : "none",
              padding: 8,
              background: "#eee",
              marginTop: 4,
              borderRadius: 4,
            }}
            aria-label={`Toggle todo ${text}`}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
