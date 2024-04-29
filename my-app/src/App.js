import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catalogue from './components/catalogue';
import Login from './components/login';
import Search from './components/search';

function App() {

  const [products, setProducts] = useState({});
  const [current, setCurrent] = useState(0);

  console.log({products});
  //start with item 1 and carry on but call all items to find length?
  useEffect(() => {
      axios.get(`http://localhost:8080/products`) 
      .then((res) => {
          setProducts(res.data);
          console.log(res.data);
      })
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-blue-400'>
      <div className='flex flex-row justify-between px-10 py-3'>
          <Search/>
          <Login/>
      </div>
    <div className='flex flex-col justify-start items-center'>
          
          <Catalogue products={products}/>

    </div>
    </div>
  );
}

export default App;
