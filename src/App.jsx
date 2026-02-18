import { useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import TodoList from './components/TodoList'

function App() {
  // This replaces "let authToken = getCookie('token')"
  const [token, setToken] = useState(null); 

  return (
    <>
      {/* This replaces the "hidden" class logic */}
      { !token ? (
        <Auth onLogin={(newToken) => setToken(newToken)} />
      ) : (
        <TodoList token={token} onLogout={() => setToken(null)} />
      )}
    </>
  )
}

export default App
