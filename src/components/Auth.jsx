export default function Auth({ onLogin }) {
  // We will add the JS logic later!
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div id="auth-section">
        <div className="form-toggle">
          <button className="active">Login</button>
          <button>Register</button>
        </div>

        <form id="login-form">
          <h2>Login</h2>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>

        {/* We will handle the Register form toggle with React state later */}
      </div>
    </div>
  );
}