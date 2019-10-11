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
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}

export default App;
