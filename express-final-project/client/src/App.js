import React, { useState, useEffect } from 'react';
import AddAnimeForm from './components/AddAnimeForm';
import EditAnimeForm from './components/EditAnimeForm';

function App() {
  const [animes, setAnimes] = useState([]);
  const [editingAnime, setEditingAnime] = useState(null); // State to track the anime being edited

  useEffect(() => {
    fetch('/api/animes')
      .then(response => response.json())
      .then(data => setAnimes(data))
      .catch(error => console.error("There was an error!", error));
  }, []);

  const handleAddAnime = (newAnime) => {
    setAnimes(currentAnimes => [...currentAnimes, newAnime]);
  };

  const handleUpdateAnime = (updatedAnime) => {
    setAnimes(currentAnimes =>
      currentAnimes.map(anime => anime.id === updatedAnime.id ? updatedAnime : anime)
    );
    setEditingAnime(null); // Reset the editing state after update
  };

  const handleDeleteAnime = (id) => {
    fetch('/api/animes/${id}', {
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
            <button onClick={() => setEditingAnime(anime)}>Edit</button>
            <button onClick={() => handleDeleteAnime(anime.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingAnime ? (
        <EditAnimeForm anime={editingAnime} onAnimeUpdate={handleUpdateAnime} />
      ) : (
        <AddAnimeForm onAnimeAdd={handleAddAnime} />
      )}
    </div>
  );
}

export default App;
