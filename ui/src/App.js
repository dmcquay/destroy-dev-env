import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  async function loadTodos() {
    const response = await fetch('http://localhost:3001/todos')
    const todos = await response.json()
    setTodos(todos)
  }

  useEffect(() => {
    loadTodos()
  }, []);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TODO</th>
            <th>Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => {
            return (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.text}</td>
                <td>{todo.sentiment}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
