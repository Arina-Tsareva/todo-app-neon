import { useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>("/api/list", fetcher);
  const [text, setText] = useState("");

  const addTodo = async () => {
    if (!text.trim()) return;

    await fetch("/api/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    mutate("/api/list");
    setText("");
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных</p>;

  return (
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <h1>TODO List</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить задачу..."
      />
      <button onClick={addTodo}>Добавить</button>
      <ul>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => <li key={todo.id}>{todo.text}</li>)
        ) : (
          <li>Задачи не найдены.</li>
        )}
      </ul>
    </div>
  );
}
