/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: This form allows you to submit contact
 */

import React, { useState } from 'react';
import './Form.css';

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for tracking submission status

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = { name, email, feedback: message };

    fetch('http://localhost:8080/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      if (onAddContact) {
        onAddContact(data);
      }
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(true); // Set the submission status to true
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  if (isSubmitted) {
    return <div>Thank you for contacting us!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Submit Contact</button>
    </form>
  );
}

export default ContactForm;
