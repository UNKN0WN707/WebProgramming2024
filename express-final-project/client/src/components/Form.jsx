/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Body section in the webpage
 */

import React from 'react';
import './Form.css';

const Form = () => {
    return (
        <div>
            <div className='foreground'>
                <div className='howTo'>
                    <h2>How To Use</h2>
                    <p>To use the Anime Collection Tracker, please enter the name of the anime in the 
                        Anime Entry Form. You can then rate the anime you watched from a scale of 1 to
                        10 using the slider. Hit submit and the anime you enter will get stored in our
                        database.
                    </p>
                </div>
                
                <form>
                    <p>Anime Entry Form</p><br/>
                    <input type="text" id="anime" placeholder="Enter Anime Here" /><br/><br/>
                    <input type="range" min="1" max="100" /><br/><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default Form;
