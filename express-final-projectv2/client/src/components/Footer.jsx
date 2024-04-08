/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Footer section in the webpage
 */

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className='end'>
            <footer>
                <p>References</p>
                <ul className='references'>
                    <li><a href="https://developer.mozilla.org/en-US/">MDN (HTML/CSS/Javascript)</a></li>
                    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
                    <li><a href="https://react.dev/">React.js</a></li>
                    <li><a href="https://nodejs.org/en">Node.js</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Footer;