import { useState, useEffect } from 'react';

export default function TodoList({ token, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setTodos(await response.json());
      } else if (response.status === 401) {
        onLogout();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        setNewTitle("");
        setNewDesc("");
        fetchTodos();
      }
    } catch (error) { console.error(error); }
  };

  // --- NEW: DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        // Optimistic UI update: Remove it from the list immediately
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) { console.error(error); }
  };

  // --- NEW: TOGGLE COMPLETE FUNCTION ---
  const handleToggle = async (todo) => {
    const newStatus = !todo.completed;
    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          title: todo.title, 
          description: todo.description, 
          completed: newStatus 
        })
      });
      if (response.ok) {
        // Update just this one item in our local state
        setTodos(todos.map(t => 
          t.id === todo.id ? { ...t, completed: newStatus } : t
        ));
      }
    } catch (error) { console.error(error); }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <div id="todo-section">
        <div className="user-controls">
          <span>User: Authorized</span>
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
              {/* CHECKBOX for toggling complete */}
              <input 
                type="checkbox" 
                className="todo-check"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              
              <div className={`task-info ${todo.completed ? "completed-task" : ""}`}>
                <strong>{todo.title}</strong><br />
                <small>{todo.description}</small>
              </div>

              <div className="action-buttons">
                {/* We will add the Edit button in the next step! */}
                <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}