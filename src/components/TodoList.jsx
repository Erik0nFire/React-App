import { useState, useEffect } from 'react';

export default function TodoList({ token, onLogout }) {
  // 1. State for the list of tasks
  const [todos, setTodos] = useState([]);
  
  // 2. State for the new task input form
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const API_URL = 'http://localhost:3000';

  // 3. THE MAGIC: Fetch tasks when the component loads
  useEffect(() => {
    fetchTodos();
  }, []); // Empty array [] means "run this once when the page loads"

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data); // Put the API data into our state
      } else if (response.status === 401) {
        onLogout(); // Token expired, kick user out
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // 4. Function to add a new task
  const handleAddTodo = async () => {
    if (!newTitle) return alert("Title is required");

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, description: newDesc })
      });

      if (response.ok) {
        // Clear the inputs
        setNewTitle("");
        setNewDesc("");
        // Refresh the list
        fetchTodos();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <div id="todo-section">
        <div className="user-controls">
          <span>User: { /* We can decode the token for username later */ }</span>
          <button onClick={onLogout}>Logout</button>
        </div>

        <div className="input-group">
          <h3>New Task</h3>
          <input 
            type="text" 
            placeholder="Task Title" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Details" 
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Task</button>
        </div>

        <ul id="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className={`task-info ${todo.completed ? "completed-task" : ""}`}>
                <strong>{todo.title}</strong><br />
                <small>{todo.description}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}