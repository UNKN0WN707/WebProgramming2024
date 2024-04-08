/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: stores and renders the other components.
 */

import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Form from './Form';
import Results from './Results';
import Footer from './Footer';
import AddAnimeForm from './AddAnimeForm';
import EditAnimeForm from './EditAnimeForm';


const Home = () => {
    

    const changeValue = () => {
        const slider = document.getElementById("slider");
        const value = document.getElementById("score");
        const results = "Score: " + slider.value;

        value.textContent = results
    }     

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

    return(
        <div>
            <Hero />
            <Form changeValue={changeValue}/>
    
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

            <Results />
            <Footer />
        </div>  
    );
}

export default Home;