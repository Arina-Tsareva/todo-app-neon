import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data: todos, mutate } = useSWR("/api/list", fetcher);
    const [text, setText] = useState("");

    const addTodo = async () => {
        if (!text.trim()) return;
        await fetch("/api/list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        mutate(); 
        setText("");
    };
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
                {todos?.map((todo: any) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    );
}
