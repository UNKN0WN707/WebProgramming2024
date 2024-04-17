import React, { useState } from 'react';
import './Form.css';

const SignupForm = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(''); // State to hold error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await fetch('http://localhost:8081/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        onSignup(); // Notify parent component upon successful signup
        setMessage('Signup successful! Please log in.');
      } else {
        throw new Error(data.message || 'Failed to sign up');
      }
    } catch (error) {
      setMessage(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
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
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
      {message && <div className="error-message">
                <span className="error-icon" style={{ paddingRight: "10px" }}>⚠️</span>
                {message}
            </div>}
    </form>
  );
};

export default SignupForm;
