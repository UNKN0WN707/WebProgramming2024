/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Allows the user to register a new account.
 */

import React, { useState } from 'react';
import './CreateUser.css';
import Hero from './Hero';
import Footer from './Footer';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setName('');
        setPassword('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error occurred while creating user.');
    }
  };

  return (
    <div className="container">
      <Hero />
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Create User</button>
      </form>
      {message && <p className="message">{message}</p>}
      <Footer />
    </div>
  );
};

export default CreateUserForm;
