/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: This file render different pages
 */

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Navbar from './components/Navbar';
import CreateUserForm from './components/CreateUser';



function App() {

  const [page, setPage] = useState(<p>Loading</p>);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setTimeout(() => {
        //Add code back
        console.log();
      }, 2000)
      
    } else {
      
        setPage(<div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/create-user" element={<CreateUserForm />} />
          </Routes>
          </div>);
    }
  }, [])
  
  return (page);
}


export default App;
