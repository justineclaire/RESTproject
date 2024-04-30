import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './search.js';
import Login from './login.js';
//search bar component
function About() {

    
    return (
        <div className='min-h-screen bg-gradient-to-b from-blue-100 to-blue-400'>
            <div className='flex flex-row justify-between px-10 py-3'>
                <Link to={'/'}><button className='flex flex-row px-3 py-1 text-black tracking-wide justify-between items-center rounded-lg bg-red-200 hover:bg-pink-100' >Home</button></Link>
                <Login/>
            </div>
        </div>
    );
}

export default About;