import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catalogue from './components/catalogue';
import Login from './components/login';
import Search from './components/search';
import { PrimeReactProvider } from 'primereact/api';

function App() {


  

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-blue-400'>
      <div className='flex flex-row justify-between px-10 py-3'>
          <Search/>
          <Login/>
      </div>
    <div className='flex flex-col justify-start items-center'>
          
          <Catalogue />

    </div>
    </div>
  );
}

export default App;
