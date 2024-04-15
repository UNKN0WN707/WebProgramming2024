import React, { useState } from 'react';
import './Form.css';

function AddAnimeForm({ onAddAnime }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAnime = { title, genre };

    // Send POST request to server endpoint
<<<<<<< HEAD
    fetch('/api/animes', {
=======
    fetch('http://localhost:8081/api/animes', {
>>>>>>> Sreypich
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnime),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Call the onAddAnime function passed as prop
      onAddAnime(data);
      // Clear form fields
      setTitle('');
      setGenre('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Genre:</label>
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button type="submit">Add Anime</button>
    </form>
  );
}

export default AddAnimeForm;
