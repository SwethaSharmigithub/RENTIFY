import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      
      // Extract role and other details from the response
      const { role, name, phoneno } = response.data;

      // Store user details in localStorage
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('phoneno', phoneno);

      // Alert and navigate based on the role
      alert('Login successful.');
      if (role === 'Seller') {
        navigate('/sellerdashboard');
      } else if (role === 'Buyer') {
        navigate('/buyerdashboard');
      } else {
        alert('Invalid role');
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setError(errorMessage);
      
      // Check if the error indicates the user is not registered
      if (errorMessage.includes('User not found')) {
        alert('You do not have an account. Please register.');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-heading">Login</div>
      <form className="form-container" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' className='login-button'>Submit</button>
        <p className="redirect-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
