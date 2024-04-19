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
  const [showPassword, setShowPassword] = useState(false); // track password
  const [message, setMessage] = useState(''); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await fetch('http://localhost:8081/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        onSignin(data.user.username);
      } else {
        throw new Error(data.message || 'Failed to sign in');
      }

      localStorage.setItem('user', data.user.token); // store the JWT token into local storage
      console.log(localStorage); 

    } catch (error) {
      setMessage(error.message);
      console.error('Error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // show/hide password
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
