import React, { useState } from 'react';

function AddAnimeForm({ onAnimeAdd }) {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch('/api/animes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('New anime added', data);
        onAnimeAdd(data); // Update the animes list in App.js
        setTitle('');
        setGenre('');
      })
      .catch(error => console.error('There was an error!', error));
    };


  return (
    <div>
      <h1>Add New Anime</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Genre:
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
          </label>
        </div>
        <button type="submit">Add Anime</button>
      </form>
    </div>
  );
}

export default AddAnimeForm;
