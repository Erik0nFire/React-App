import { useState } from 'react';

export default function Auth({ onLogin }) {
  // State for inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // State to toggle between Login and Register views
  const [isRegister, setIsRegister] = useState(false);
  
  // State for error messages
  const [error, setError] = useState("");

  const API_URL = 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isRegister ? '/register' : '/login';
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegister) {
          setIsRegister(false); // Switch to login view
          setError("Registration successful! Please log in.");
        } else {
          onLogin(data.token); // Log the user in
        }
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Server error. Is the backend running?");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <div id="auth-section">
        <div className="form-toggle">
          {/* FIX: Added type="button" to prevent form submission */}
          <button 
            type="button" 
            className={!isRegister ? "active" : ""} 
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          
          {/* FIX: Added type="button" to prevent form submission */}
          <button 
            type="button" 
            className={isRegister ? "active" : ""} 
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>{isRegister ? "Create Account" : "Login"}</h2>
          
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          <button type="submit">
            {isRegister ? "Register" : "Sign In"}
          </button>
          
          {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
        </form>
      </div>
    </div>
  );
}