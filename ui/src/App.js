import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  async function loadTodos() {
    const response = await fetch("http://localhost:3001/todos");
    const todos = await response.json();
    const prioritized = await fetch(
      "http://localhost:5000/PrioritizeTodo",
      todos
    );
    console.log(prioritized);
    setTodos(todos);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TODO</th>
            <th>Sentiment</th>
            <th>Cache Hit</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => {
            return (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.text}</td>
                <td>{todo.sentiment.payload}</td>
                <td>{todo.sentiment.cacheHit ? "yes" : "no"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
