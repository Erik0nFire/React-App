export default function TodoList({ token, onLogout }) {
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div id="todo-section">
        <div className="user-controls">
          <span>User: { /* We will put username here later */ }</span>
          <button onClick={onLogout}>Logout</button>
        </div>

        <div className="input-group">
          <h3>New Task</h3>
          <input type="text" placeholder="Task Title" />
          <input type="text" placeholder="Details" />
          <button>Add Task</button>
        </div>

        <ul id="todo-list">
           {/* We will map over the array here later */}
        </ul>
      </div>
    </div>
  );
}