import { useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import TodoList from './components/TodoList'

function App() {
  const [token, setToken] = useState(null); 
  const [username, setUsername] = useState("");

  const handleLogin = (newToken, newUser) => {
    setToken(newToken);
    setUsername(newUser);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername("");
  };

  return (
    <>
      { !token ? (
        <Auth onLogin={handleLogin} />
      ) : (
        // Pass the username down to the list
        <TodoList token={token} username={username} onLogout={handleLogout} />
      )}
    </>
  )
}

export default App