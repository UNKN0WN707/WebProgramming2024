import React, { useState } from 'react';
import './Form.css';

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = { name, email, feedback: message }; 

    // Send POST request to server endpoint
    fetch('http://localhost:8081/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      
      if(onAddContact) {
        onAddContact(data);
      }
      
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

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
