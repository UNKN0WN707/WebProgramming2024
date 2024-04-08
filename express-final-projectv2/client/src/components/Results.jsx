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
        <div className="foreground2"> 
            <hr/><br/><br/>
            <div className="list">
                <table>
                    <tr className="titles"><th id="title">Anime</th><th>Genre</th><th>Rating</th><th id="action">Action</th></tr>
                    <tr><td id="title">One Punch Man</td><td>Action</td><td>9</td><td className="options"><button>+</button><button className='remove'>-</button><button><img src="./trashcan.png" alt="trashcan" className="trash" /></button></td></tr>
                    <tr><td id="title">Pokemon</td><td>Battling Monsters</td><td>7</td><td className="options"><button>+</button><button className='remove'>-</button><button><img src="./trashcan.png" alt="trashcan" className="trash" /></button></td></tr>
                </table>
            </div>
            <br/><br/><hr className='bottom' />
        </div>
    );
};

export default Results;

