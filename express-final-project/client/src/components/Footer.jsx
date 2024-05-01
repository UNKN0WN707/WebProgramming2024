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

function Footer() {
    return (
        <footer>
            <hr />
            <div className="row">
                <div className="col">
                    <p>&#169; 2024 Designed by <span className="designer1">Sreypich. & Andy. </span>All Rights Reserved.</p>
                </div>
                <div className="socialIcons">
                    <a href="https://www.instagram.com/sreypichheng_/"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.facebook.com/UNKN0WN707/"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://github.com/UNKN0WN707"><i className="fa-brands fa-github"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;