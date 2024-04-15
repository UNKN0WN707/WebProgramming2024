import React, { useState } from 'react';

function EditAnimeForm({ anime, onAnimeUpdate }) {
  const [title, setTitle] = useState(anime.title);
  const [genre, setGenre] = useState(anime.genre);

  const handleSubmit = (event) => {
    event.preventDefault();

<<<<<<< HEAD
    fetch(`/api/animes/${anime.id}`, { // Make sure to use backticks here
=======
    fetch(`/api/animes/${anime._id}`, {
>>>>>>> Sreypich
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, genre }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(updatedAnime => {
      console.log('Anime updated', updatedAnime);
      onAnimeUpdate(updatedAnime); // Trigger an update in the parent component
    })
    .catch(error => console.error('There was an error!', error));
  };

  return (
    <div>
      <h1>Edit Anime</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </label>
        </div>
        <div>
          <label>
            Genre:
            <input 
              type="text" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)} 
            />
          </label>
        </div>
        <button type="submit">Update Anime</button>
      </form>
    </div>
  );
}

export default EditAnimeForm;
