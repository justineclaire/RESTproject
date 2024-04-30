import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

//search bar component
function Faves({currentUser}) {

    const [results, setResults] = useState([]);
    
    useEffect(() => {
            axios.get(`http://localhost:8080/users/${currentUser.uid}`)
            .then((res) => {
                setResults(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));

            
    }, [currentUser]); 

    return (
        <div className='flex flex-col h-max font-Archivo'>
            {results ? (
                <div>
                    {results.map(user => (
                    <div key={user._id}>
                        {user.favouriteList.map(fave => (
                        <div key={fave._id} className='flex flex-row justify-between bg-pink-100 rounded-lg items-center h-32 p-5 w-full'>
                            <img src={fave.image} className='h-32 w-32 p-2 rounded-xl' alt='Product Image' />
                            <div className='flex flex-col justify-between'>
                                <h1 className=' font-Archivo font-bold'>{fave.name}</h1>
                                <p>{fave.manufacturer}</p>
                                <Link to={fave.url} className='bg-blue-200 rounded-lg p-2 w-1/2 hover:bg-blue-400 text-sm'><button>Buy me</button></Link>
                            </div>
                           

                            {/* You can access other properties of fave here */}
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                ) : (
                <h1>Please add products to your favourites list to view them here!</h1>
                )}
        </div>
    );
}

export default Faves;