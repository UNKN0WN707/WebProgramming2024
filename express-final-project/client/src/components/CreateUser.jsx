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
    <div>
      <Hero />
      <div className="container">
      {!isAuthenticated && (
        <div>
          <h2>New User</h2>
          <button onClick={handleSignup}>Sign Up</button>
          <h2>Exisiting User</h2>
          <button onClick={handleSignin}>Sign In</button>
        </div>
      )}
      {showSignup && <SignupForm onSignup={handleAuthenticated} />}
      {showSignin && <SigninForm onSignin={handleAuthenticated} />}
      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          {}
        </form>
      )}
      {message && <p className="message">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CreateUserForm;
