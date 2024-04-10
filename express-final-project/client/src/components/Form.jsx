/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Body section in the webpage, integrated with AddAnimeForm functionality
 */

import React, { useState } from 'react';
import './Form.css';

const Form = ({ onAnimeAdd }) => {
    // State hooks for title, genre, and score
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [score, setScore] = useState(5); // Assuming score is a value between 1 and 10

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Replace '/api/animes' with your actual endpoint that handles the data submission
        fetch('/api/animes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, genre, score }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('New anime added', data);
            onAnimeAdd(data); // Assuming you want to do something with this data in a parent component
            // Reset form fields
            setTitle('');
            setGenre('');
            setScore(5); // Reset score to default mid-value
        })
        .catch(error => console.error('There was an error!', error));
    };

    // Function to update the score based on the range input's value
    const changeValue = (event) => {
        setScore(event.target.value);
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
                
                <form onSubmit={handleSubmit}>
                    <p>Anime Entry Form</p>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter Anime Here" 
                    /><br/>
                    <input 
                        type="text" 
                        value={genre} 
                        onChange={(e) => setGenre(e.target.value)} 
                        placeholder="Enter Genre Here" 
                    /><br/>
                    <p>Score: {score}</p>
                    <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={score} 
                        onChange={changeValue} 
                        id="slider" 
                    /><br/><br/>
                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
        </div>
    );
};

export default Form;
