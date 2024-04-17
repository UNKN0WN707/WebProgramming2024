import React, { useState } from 'react';
import './Form.css';

const SigninForm = ({ onSignin }) => {
  const [formData, setFormData] = useState({
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
      const response = await fetch('http://localhost:8081/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        onSignin(); // Notify parent component upon successful signin
      } else {
        throw new Error(data.message || 'Failed to sign in');
      }
    } catch (error) {
      setMessage(error.message);
      console.error('Error:', error);
    }
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
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Sign In</button>
      {message && <div className="error-message">{message}</div>} {/* Displaying error message */}
    </form>
  );
};

export default SigninForm;
