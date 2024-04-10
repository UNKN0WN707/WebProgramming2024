/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Navbar section in the webpage
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div className="logo"> 
                <h1>ROWAN WEB</h1>
                <h2>PROGRAMMING</h2>
            </div>

            <ul className="navButtons">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>  
                <li>
                    <Link to="/create-user">Create Account</Link>
                </li>      
            </ul>
        </nav>
    );
};

export default Navbar;
