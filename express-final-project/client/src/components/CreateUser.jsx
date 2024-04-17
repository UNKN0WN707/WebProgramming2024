import React, { useState } from 'react';
import './CreateUser.css';
import Hero from './Hero';
import Footer from './Footer';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';

const CreateUserForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleSignin = () => {
    setShowSignin(true);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setMessage('Signup successful! Welcome!');
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
        setMessage(data.message);
        setUsername('');
        setEmail('');
        setPassword('');
        handleAuthenticated(); // Set authentication state to true
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
      {!isAuthenticated && (
        <div>
          <p>You need to sign up or sign in to create a new user.</p>
          <button onClick={handleSignup}>Sign Up</button>
          <button onClick={handleSignin}>Sign In</button>
        </div>
      )}
      {showSignup && <SignupForm onSignup={handleAuthenticated} />}
      {showSignin && <SigninForm onSignin={handleAuthenticated} />}
      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          {/* Form inputs and submit button here */}
        </form>
      )}
      {message && <p className="message">{message}</p>}
      <Footer />
    </div>
  );
};

export default CreateUserForm;
