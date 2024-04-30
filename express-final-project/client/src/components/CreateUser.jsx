/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: this component allow users to create new account
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';
import Hero from './Hero';
import Footer from './Footer';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';

const CreateUserForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 
  const [showSignin, setShowSignin] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      setIsAuthenticated(true);
      setUserDisplayName(JSON.parse(user).username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserDisplayName('');
    setMessage('');
    navigate('/');
  };

  const handleAuthenticated = (username, token) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setIsAuthenticated(true);
    setUserDisplayName(username);
    setMessage('Signin successful! Welcome!');
  };

  // Function to toggle visibility of Signup Form
  const handleSignup = () => {
    setShowSignup(true);
    setShowSignin(false);
  };

  // Function to toggle visibility of Signin Form
  const handleSignin = () => {
    setShowSignin(true);
    setShowSignup(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        handleAuthenticated(data.username, data.token);
        setUsername('');
        setEmail('');
        setPassword('');
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Error occurred while creating user.');
      }
    } catch (error) {
      setMessage('Error occurred while creating user.');
    }
  };

  return (
    <div>
      <Hero />
      <div className="container">
        {isAuthenticated ? (
          <div>
            <p>Welcome, {userDisplayName}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>New User</h2>
            <button onClick={handleSignup}>Sign Up</button>
            <h2>Existing User</h2>
            <button onClick={handleSignin}>Sign In</button>
            {showSignup && <SignupForm onSignup={handleAuthenticated} />}
            {showSignin && <SigninForm onSignin={handleAuthenticated} />}
            {isAuthenticated && (
              <form onSubmit={handleSubmit}>
                {/* Add form elements for authenticated user */}
              </form>
            )}
          </div>
        )}
        <p className="message">{message}</p>
      </div>
      <Footer />
    </div>
  );
};

export default CreateUserForm;
