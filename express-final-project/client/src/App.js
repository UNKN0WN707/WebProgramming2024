import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Navbar from './components/Navbar';
import CreateUserForm from './components/CreateUser';



function App() {


  return (
    <div>
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-user" element={<CreateUserForm />} />
        </Routes>
    </div>
  )
}


export default App;
