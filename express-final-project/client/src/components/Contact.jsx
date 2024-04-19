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
import Footer from './Footer';
import ContactForm from './ContactForm'; 

const Contact = () => {

    // Handler function to process successful contact submission
    const handleAddContact = (contactData) => {
        console.log('Contact Added:', contactData);
    };

    return (
        <div>
            <Hero />
            <div className="contact-form-container">
                <h2>Contact Us</h2>
                <ContactForm onAddContact={handleAddContact} />
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
