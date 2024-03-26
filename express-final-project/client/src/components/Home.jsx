/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: stores and renders the other components.
 */

import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Form from './Form';

const Home = () => {
    

    const changeValue = () => {
        const slider = document.getElementById("slider");
        const value = document.getElementById("score");
        const results = "Score: " + slider.value;

        value.textContent = results
    }     

    return(
        <div>
            <Navbar />
            <Hero />
            <Form changeValue={changeValue}/>
        </div>  
    );
}

export default Home;