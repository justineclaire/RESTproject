import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Catalogue from './components/catalogue';
import Login from './components/login';
import Search from './components/search';
import About from './components/about'
import setFromSearch from './components/catalogue'

function App() {

  return (
      <Router>
      <Routes>
        <Route exact path="/index.html" element={<Catalogue />} />
        <Route exact path="/" element={<Catalogue />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/about.html" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
