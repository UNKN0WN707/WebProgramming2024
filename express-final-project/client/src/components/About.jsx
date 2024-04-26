/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: this is a component shows the about page.
 */

import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import './About.css';

const About = () => {
    return(
        <div>
            <Hero />
            <div className="foregroundAbout">
                <ul className="ends">
                    <li>
                        <h2 className="FB-End">Front-End</h2>
                        <p>What the user sees and interacts with. Multiple technologies were used to make the User Interface modern looking and functional.</p>
                    </li>
                    <li>
                        <h2><img className="iconh" src="./html.png" alt="HTML Logo" />HTML</h2>
                        <p>HTML was used to build the basic structure of the webpages.</p>
                    </li>
                    <li>
                        <h2><img className="iconc" src="./css.png" alt="CSS Logo" />CSS</h2>
                        <p>CSS was used to add styling to the different React Components.</p>
                    </li>
                    <li>
                        <h2><img className="iconj" src="./js.webp" alt="Javascript Logo" />Javascript</h2>
                        <p>Javascript was used to create functionality to the web application.</p>
                    </li>
                    <li>
                        <h2><img className="iconj" src="./react.png" alt="REACT Logo" />React</h2>
                        <p>React combined HTML and Javascript into JSX also known as React Components. CSS files would then be linked to individual components instead of a global stylesheet.</p>
                    </li>
                </ul>
                <br />
                <hr className="separator"/>
                <ul className="ends">
                    <li>
                        <h2 className="FB-End">Back-End</h2>
                        <p>Works with the Front-End to store information into a database and send data to the client side.</p>
                    </li>
                    <li>
                        <h2><img className="iconn" src="./node.png" alt="Node Logo" />Node</h2>
                        <p>Node is a package manager for Javascript that allows you to install new packages and run Javascript programs.</p>
                    </li>
                    <li>
                        <h2><img className="iconm" src="./mongo.jpg" alt="Mongo Logo" />MongoDB</h2>
                        <p>Mongo is a NoSQL database that uses documents and collections. This stores the data that was given from the client side.</p>
                    </li>
                    <li>
                        <h2><img className="iconj" src="./js.webp" alt="Javascript Logo" />Javascript</h2>
                        <p>Javascript was used along with Express to create routes and work with the Mongo Database.</p>
                    </li>
                    <li>
                        <h2>Express</h2>
                        <p>Express was used to create the API and routes that connect the Client Side to the Server.</p>
                    </li>
                </ul>
            </div>
            <Footer />
        </div>  
    );
}

export default About;
