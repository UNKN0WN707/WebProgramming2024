/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Navbar section in the webpage
 */

import React from 'react';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav> 
            <h1>Anime Collection Tracker</h1>

            <ul>
                <li><a href="#">HOME</a></li>
                <li><a href="#">ABOUT</a></li>
                <li><a href="#">CONTACT</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;