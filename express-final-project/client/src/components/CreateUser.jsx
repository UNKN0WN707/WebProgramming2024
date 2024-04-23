/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
<<<<<<< HEAD
 *   Description: Allows the user to register a new account.
 */

=======
 *   Description: this component allow users to create new account
 */


>>>>>>> main
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
  const [userDisplayName, setUserDisplayName] = useState('');

  const handleSignup = () => {
    setShowSignup(true);
    setShowSignin(false); // Close signin section
  };

  const handleSignin = () => {
    setShowSignin(true);
    setShowSignup(false); // Close signup section
  };

  const handleAuthenticated = (username) => {
    setIsAuthenticated(true);
    setUserDisplayName(username); // Set user's display name
    setMessage('Signin successful! Welcome!');
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
        handleAuthenticated(data.username); // Pass username to handleAuthenticated
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
      {isAuthenticated && (
        <div>
          <p>Welcome, {userDisplayName}!</p> {/* Show user's name */}
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <h2>New User</h2>
          <button onClick={handleSignup}>Sign Up</button>
          <h2>Existing User</h2>
          <button onClick={handleSignin}>Sign In</button>
        </div>
      )}
      {showSignup && <SignupForm onSignup={handleAuthenticated} />}
      {showSignin && <SigninForm onSignin={handleAuthenticated} />}
      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          {/* Add form elements for authenticated user */}
        </form>
      )}
      {message && <p className="message">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CreateUserForm;
