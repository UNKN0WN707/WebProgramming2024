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
             <h2>About Us</h2>
                <div className='dev'>
                    <img src={profilePicture} alt="Andy Tran" className="about-img"/>
                    <p>Developer: Andy Tran</p>
                    <p>Based in NJ</p> 
                    <p>B.S in Computer Science</p>
            
            
                    <img src={profilePic} alt="Sreypich Heng" className="about-img"/>
                    <p>Developer: Sreypich Heng</p>
                    <p>Based in PA</p>
                    <p>B.S in Computer Science</p>
               
                </div>
        </div>
            <div className="contact-form-container">
                <h2>Leave Us a Message or Feedback</h2>
                <ContactForm onAddContact={handleAddContact} />
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
