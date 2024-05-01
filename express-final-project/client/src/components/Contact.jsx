/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: stores and renders the other components.
 */

import React from 'react';
import './Contact.css';
import Hero from './Hero';
import Footer from './Footer';
import ContactForm from './ContactForm'; 
import profilePicture from './andy-tran.jpg';
import profilePic from './sreypich-heng.jpeg';


const Contact = () => {

    // Handler function to process successful contact submission
    const handleAddContact = (contactData) => {
        console.log('Contact Added:', contactData);
    };

    return (
        <div>
            <Hero />
             <div className='foregroundContact'>
              <div>
                  <h2>Contact Us</h2>
                  <img src={profilePicture} alt="Andy Tran" className="about-img"/>
                  <div className="dev">
                    <p>Developer: Andy Tran</p>
                  </div>
                  <img src={profilePic} alt="Sreypich Heng" className="about-img"/>
              </div>
            </div>
            <div className="contact-form-container">
                <h2>Contact Us</h2>
                <ContactForm onAddContact={handleAddContact} />
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
