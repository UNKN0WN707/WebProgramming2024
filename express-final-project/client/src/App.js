import React, { useState, useEffect } from 'react';
import AddAnimeForm from './components/AddAnimeForm';

function App() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch('/api/animes')
      .then(response => response.json())
      .then(data => setAnimes(data))
      .catch(error => console.error("There was an error!", error));
  }, []);

  const handleAddAnime = (newAnime) => {
    setAnimes(currentAnimes => [...currentAnimes, newAnime]);
  };

  const handleDeleteAnime = (id) => {
    fetch(`/api/animes/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setAnimes(currentAnimes => currentAnimes.filter(anime => anime.id !== id));
      } else {
        console.error('Failed to delete the anime.');
      }
    })
    .catch(error => console.error('There was an error!', error));
  };

  return (
    <div>
      <h1>Anime Collection</h1>
      <ul>
        {animes.map(anime => (
          <li key={anime.id}>
            {anime.title} - {anime.genre}
            <button onClick={() => handleDeleteAnime(anime.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddAnimeForm onAnimeAdd={handleAddAnime} />
    </div>
  );
}

export default App;
