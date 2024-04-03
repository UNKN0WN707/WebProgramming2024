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
import Footer from './Footer';

const Contact = () => {
    

    return(
        <div>
            <Hero />
            <Footer />
        </div>  
    );
}

export default Contact;