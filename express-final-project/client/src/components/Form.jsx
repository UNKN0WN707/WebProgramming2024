/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Body section in the webpage, integrated with AddAnimeForm functionality
 */

import React, { useState, useEffect, useCallback } from 'react';
import './Form.css';
import AddAnimeForm from './AddAnimeForm';
import EditAnimeForm from './EditAnimeForm';

const Form = () => {   

    const [animes, setAnimes] = useState([]);
    const [editingAnime, setEditingAnime] = useState(null); // State to track the anime being edited
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token); 
    
      if (token) {
        setIsAuthenticated(true);
        fetch('/api/animes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setAnimes(data);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
      } else {
        console.error("No token available.");
      }
    }, []);
  
    // Handle Add Anime
    const handleAddAnime = useCallback((newAnime) => {
      const token = localStorage.getItem('token');
      fetch('/api/animes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newAnime),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to add anime');
      })
      .then(data => {
        setAnimes(currentAnimes => [...currentAnimes, data]);
      })
      .catch(error => console.error('There was an error!', error));
    }, []);
    

    // Handle Edit
    const handleUpdateAnime = (updatedAnime) => {
      setAnimes(currentAnimes =>
        currentAnimes.map(anime => anime._id === updatedAnime._id ? updatedAnime : anime)
      );
      setEditingAnime(null); // Reset the editing state after update
    };
  
    // Handle delete
    const handleDeleteAnime = (id) => {
      fetch(`http://localhost:8080/api/animes/${id}`, {
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
                  <p> There are a lot of Anime out there and we are here to help you keep track of
                    them all! To use the Anime Collection Tracker, please sign up or signin in order to enter the name and genres of the 
                    anime in the form. You can then submit the Anime to our database and we will store it there for you.
                    Once entered into the database, you can edit the Anime entry in case you made a mistake or
                    delete the entry.
                  </p>
              </div>
              <div>
                  {isAuthenticated ? (
                      <div>
                          <AddAnimeForm onAddAnime={handleAddAnime} />
                          {animes.map(anime => (
                              <div key={anime._id}>
                                  <table className="result">
                                      <thead>
                                          <tr className="titles">
                                              <th>Anime</th>
                                              <th>Genre</th>
                                              <th>Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td>{anime.title}</td>
                                              <td>{anime.genre}</td>
                                              <td>
                                                  <button className="btn" onClick={() => setEditingAnime(anime)}>Edit</button>
                                                  <button className="btn" onClick={() => handleDeleteAnime(anime._id)}>Delete</button>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          ))}
                          {editingAnime && (
                              <EditAnimeForm
                                  anime={editingAnime}
                                  onAnimeUpdate={handleUpdateAnime}
                              />
                          )}
                      </div>
                  ) : (
                      <p>Please sign in to view your anime collection.</p>
                      
                  )}
              </div>
          </div>
      </div>
  );
};

export default Form;
