/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Results section in the webpage
 */

import React from 'react';
import './Results.css'

const Results = () => {
    return (
        <div className="border"> 
            <hr/>
            <div className="foreground2">
                <table>
                    <tr className="titles"><th id="title">Anime</th><th>Genre</th><th>Rating</th><th id="action">Action</th></tr>
                    <tr><td id="title">One Punch Man</td><td>Action</td><td>9</td><td className="options"><p>+</p><p>-</p><i class="fa-solid fa-trash-can"></i><img src="./trashcan.png" alt="trashcan" className="trash" /></td></tr>
                </table>
            </div>
        </div>
    );
};

export default Results;

