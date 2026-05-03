import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import '../style/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) setError(result.error);
  };

  return (
  <div className="login-container">
  <div className="login-card">
    <h2>Login</h2>
    <p className="login-subtitle">Welcome back</p>

    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
      </div>

      <button type="submit" className="login-button">Login</button>
    </form>

    {error && <p className="login-error">{error}</p>}

    <p className="login-footer">
      Don't have an account? <Link to="/register">Register</Link>
    </p>
  </div>
</div>
  );
};


export default Login;
