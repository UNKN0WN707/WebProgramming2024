/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: This form allows you to add an anime
 */

import React, { useState } from 'react';
import './Form.css';

function AddAnimeForm({ onAddAnime }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAnime = { title, genre };
    const token = localStorage.getItem('token');
  
    //if (!token) {
    //  console.error("No token found, please login first.");
     // return;
    //}
  
    fetch('http://localhost:8080/api/animes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newAnime)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add anime');
      }
    })
    .then(data => {
      console.log('Success:', data);
      onAddAnime(data);
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
