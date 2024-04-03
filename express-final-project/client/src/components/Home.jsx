/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: stores and renders the other components.
 */

import React from 'react';
import Hero from './Hero';
import Form from './Form';
import Results from './Results';
import Footer from './Footer';


const Home = () => {
    

    const changeValue = () => {
        const slider = document.getElementById("slider");
        const value = document.getElementById("score");
        const results = "Score: " + slider.value;

        value.textContent = results
    }     

    return(
        <div>
            <Hero />
            <Form changeValue={changeValue}/>
            <Results />
            <Footer />
        </div>  
    );
}

export default Home;