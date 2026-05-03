import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import '../style/Register.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(username, email, password);
    if (!result.success) setError(result.error);
  };

  return (
  <div className="register-container">
  <div className="register-card">
    <p className="register-eyebrow">Create Account</p>
    <div className="register-divider"></div>
    <p className="register-subtitle">Start your restaurant journey today</p>

    <form onSubmit={handleSubmit} className="register-form">
      <div className="input-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="register-input"
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
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
          className="register-input"
        />
      </div>

      <button type="submit" className="register-button">Register</button>
    </form>

    {error && <p className="register-error">{error}</p>}

    <p className="register-footer">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
</div>
  );
};


export default Register;