import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './search.js';
import Login from './login.js';
//search bar component
function About() {

    
    return (
        <div className=' flex flex-col font-Archivo items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-400'>
            <div className='flex flex-row justify-between px-10 py-3'>
                <Link to={'/'}><button className='flex flex-row px-3 py-1 text-black tracking-wide justify-between items-center rounded-lg bg-red-200 hover:bg-pink-100' >Home</button></Link>
                <Login/>
            </div>

            <div className='bg-white rounded-lg p-5 h-full w-5/6'>
                <h1 className='font-bold'>How this application works</h1>
                <p className='text-sm'>This application works using react in the frontend and node.js with express with mongodb in the backend. React uses JSX files that contain html tags. It creates a Single Page with many components that work together asynchronously.
                    It is the 'client' and makes requests to the server. Usually React runs on its own node server and on port 3000 but I set the node.js server in the backend to run the react code on port 8080 itself. </p>
                <ul className='m-2'>
                <li className='text-sm m-1'><span className='font-bold'>Step 1: </span>The server (node.js) starts listening for client requests on a specific port; 8080 in the case of this app. It also connects to the mongodb database on my local machine on port 27017. You run 'node index.js' to start this.</li>
                    <li className='text-sm m-1'><span className='font-bold'>Step 2: </span>A user will launch the browser and request a webpage e.g. https://localhost:8080/index.html </li>
                    <li className='text-sm m-1'><span className='font-bold'>Step 3: </span>The server receives the request and looks for a file names index.html. In the case if this app it will look in the build directory of the react app which contains code to send back to the browser as index.html.  </li>
                    <li className='text-sm m-1'><span className='font-bold'>Step 4: </span>The client executes the code and displays the webapp. It also runs axios code which is a react library that simplifies ajax calls. This code uses endpoints in the index.js code to request data from the database. tldr: the browser runs index.html and makes axios requests to the server for db information</li>
                    <li className='text-sm m-1'><span className='font-bold'>Step 5: </span>The server runs the endpoint code requesting information from mongodb which it has already made a connection with. If successful the server will forward the returned data to the browser or it will pass an error message back.</li>
                    <li className='text-sm m-1'><span className='font-bold'>Step 6: </span>The client runs the code using the data returned to axios and updates the DOM document according to the data</li>
                </ul>
                <h1 className='font-bold'>The technologies involved in my project</h1>
                <p className='text-sm'>
                    <ul className='m-2'>
                        <li className='text-sm m-1'><span className='font-bold'>React: </span>React is afront end javascriot library. It puts components (small reusable bits of html) together to form a web app. Instead of reloading entire pages by requesting them from the server, it only changes parts of the page and thus is faster than vanilla html and js. It uses a virtual dom (which is a copy of the actual dom). This virtual DOM is reloaded to compare to the actual DOM and so React knows what has changed and what parts of the actual DOM it should update.</li>
                        <li className='text-sm m-1'><span className='font-bold'>Axios: </span>Axios is a javascript library that is used to make HTTP requests from the browser to Node.js. Axios works by creating XMLHttpRequest objects to send HTTP requests. It handles cross-origin requests, cookies, and other browser-specific features transparently.</li>
                        <li className='text-sm m-1'><span className='font-bold'>Tailwind CSS: </span>Tailwind is a CSS framework that allows you to use css on your html code by adding to the html code classes instead of a separate css file.</li>
                        <li className='text-sm m-1'><span className='font-bold'>Node.js with express: </span> Node is an open-source runtime server for JavaScript. It works by compiling js to native machine code while its running, allowing you to run javascript on the server. It uses a single thread making it fast. Express is a routing framework in Node. It provides methods to specify what function is called for each request (Get, post, put etc.) </li>
                        <li className='text-sm m-1'><span className='font-bold'>MongoDB: </span>Mongo is a NoSQL database that stores data in 'documents' similar to JSON objects. It is highly scalable and flexible. It has the option of schemas but this is not mandatory. I used mongoose in this webapp which handles data object modelling like schemas in Node with Mongo.</li>
                    </ul>
                </p>
                <h1 className='font-bold'>Weaknesses in my project</h1>
                <p className='text-sm'>My project falls down in error checking. There is error checking involved in very important sections like inserting new data however, sometimes it takes a long time to load and it may not be clear to the user what is going on exactly. 
                It can be quite slow when calling the entire database of products and upon reflection now I should probably have called each product one by one instead of every product and then sifting through that with javascript. It can take a long time for products to display and you have to just wait for them with no context.</p>
                <p className='text-sm m-1'>Also, the design of the web app, gives the feeling of a school project rather than a real commercial web application. Had I more time, I would improve the look and feel of the UI.</p>
                <h1 className='font-bold'>Alternatives I could have used</h1>
                <p className='text-sm'>I could have used vanilla js and html instead of react. I also could have used bootstrap instead of tailwind css for things like flexbox. I could have used MySQL or another relational database that works with node.js. Instead of node.js I could have used apache and php code for the server. </p>
            </div>
        </div>
    );
}

export default About;