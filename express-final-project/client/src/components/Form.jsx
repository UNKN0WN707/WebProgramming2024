/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Body section in the webpage, integrated with AddAnimeForm functionality
 */

import React, { useState, useEffect } from 'react';
import './Form.css';
import AddAnimeForm from './AddAnimeForm';
import EditAnimeForm from './EditAnimeForm';

const Form = () => {   

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
            <div className='foreground'>
                <div className='howTo'>
                    <h2>How To Use</h2>
                    <p>There are a lot of Anime out there and we are here to help you
                        keep track of all of them! To use the Anime Collection Tracker, please enter 
                        the name and genre of the anime in the form below. You can then rate the anime you 
                        watched from a scale of 1 to 10 using the slider. Hit submit and the anime you 
                        entered will get stored in our database.
                    </p>
                </div>

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
        </div>
    );
};

export default Form;
