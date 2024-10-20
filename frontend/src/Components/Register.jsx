import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneno: '', 
    role: '' 
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);
      console.log(response.data); 
      localStorage.setItem('role', formData.role);
      localStorage.setItem('name', formData.name);
      localStorage.setItem('phoneno', formData.phoneno);
      localStorage.setItem('email', formData.email);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setError(errorMessage);
      
      // Check if the error indicates the user is already registered
      if (errorMessage.includes('User already exists')) {
        alert('You are already registered. Please log in.');
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };
  
  return (
    <div className="reg-container">
      <div className="reg-heading">Register</div>
      <form className="form-container" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor='phoneno'>Phone No:</label> 
          <input type='text' id='phoneno' value={formData.phoneno} onChange={handleChange} /> 
        </div>
        <div className="form-group">
          <label htmlFor='role'>Role:</label>
          <select id='role' value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option> 
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
        </div>
        <button type='submit' className='reg-button'>Submit</button>
        <p className="redirect-link">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
