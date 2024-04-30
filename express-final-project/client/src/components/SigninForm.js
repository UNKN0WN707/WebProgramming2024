/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: This form allows you to sign into an account
 */

import React, { useState } from 'react';
import './Signinandup.css';

const SigninForm = ({ onSignin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await fetch('http://localhost:8080/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received data with token:", data);
        
        localStorage.setItem('token', data.token); // Save the token to localStorage
        console.log("Stored token:", localStorage.getItem('token'));
        
        localStorage.setItem('user', JSON.stringify(data.user)); // Optionally save other user data
        onSignin(data.user.username, data.token); // Pass both username and token
      } else {
        const errorMessage = await response.json(); // Handle JSON error messages
        throw new Error(errorMessage.message || 'Failed to sign in');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const togglePasswordVisibility = () => { // Function to toggle password visibility
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </label>
      <button type="submit">Sign In</button>
      {message && <div className="error-message">
        <span className="error-icon" style={{ paddingRight: "10px" }}>⚠️</span>
        {message}
      </div>}
    </form>
  );
};

export default SigninForm;
