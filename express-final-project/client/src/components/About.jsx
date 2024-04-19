/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: this is a component shows the about page
 */

import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import './About.css';

const About = () => {
    return(
        <div>
            <Hero />
            <div className="about-container">
                <h2>About Page</h2>
                <p>
                    Provides detailed information about the application, its purpose, the technologies used, and the team behind it.
                </p>
            </div>
            <Footer />
        </div>  
    );
}

export default About;
