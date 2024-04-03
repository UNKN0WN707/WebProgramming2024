import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddAnimeForm from './components/AddAnimeForm';
import EditAnimeForm from './components/EditAnimeForm';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Navbar from './components/Navbar';



function App() {
  const [animes, setAnimes] = useState([]);
  const [editingAnime, setEditingAnime] = useState(null); // State to track the anime being edited

  useEffect(() => {
    console.log("Fetching anime data...");
    fetch('/api/animes')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched anime data:", data);
        setAnimes(data);
      })
      .catch(error => console.error("There was an error!", error));
  }, []);
  

  const handleAddAnime = (newAnime) => {
    setAnimes(currentAnimes => [...currentAnimes, newAnime]);
  };

  const handleUpdateAnime = (updatedAnime) => {
    setAnimes(currentAnimes =>
      currentAnimes.map(anime => anime._id === updatedAnime._id ? updatedAnime : anime)
    );
    setEditingAnime(null); // Reset the editing state after update
  };

  const handleDeleteAnime = (id) => {
    fetch(`/api/animes/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setAnimes(currentAnimes => currentAnimes.filter(anime => anime._id !== id));
      } else {
        console.error('Failed to delete the anime.');
      }
    })
    .catch(error => console.error('There was an error!', error));
  };

  return (
    <div>
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
        </Routes>
      
      <AddAnimeForm onAddAnime={handleAddAnime} />
      {animes.map(anime => (
        <div key={anime._id}>
          <p>{anime.title} - {anime.genre}</p>
          <button onClick={() => setEditingAnime(anime)}>Edit</button>
          <button onClick={() => handleDeleteAnime(anime._id)}>Delete</button>
        </div>
      ))}
      {editingAnime && (
        <EditAnimeForm
          anime={editingAnime}
          onUpdateAnime={handleUpdateAnime}
        />
      )}
  </div>
);
}


export default App;
