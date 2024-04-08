import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Navbar from './components/Navbar';



function App() {


  return (
    <div>
<<<<<<< HEAD
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
=======
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
        </Routes>
>>>>>>> origin/sreypich
    </div>
  )
}


export default App;
