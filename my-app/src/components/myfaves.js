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

    const remove = (prodid) => {
        axios.post(`http://localhost:8080/removeFaves`, {uid: currentUser.uid, prodid: prodid})
            .then((res) => {
                console.log(res.data);
                // Refresh data after removing the favorite
                axios.get(`http://localhost:8080/users/${currentUser.uid}`)
                .then((res) => {
                    setResults(res.data);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
                })
            .catch((err) => console.log(err));
    }

    return (
        <div className='flex flex-col h-max font-Archivo'>
            {results ? (
                <div>
                    {results.map(user => (
                    <div key={user._id}>
                        {user.favouriteList.map(fave => (
                        <div key={fave._id} className='flex flex-row justify-start bg-pink-100 rounded-lg items-center h-32 p-5 m-2 w-full'>
                            <img src={fave.image} className='h-32 w-32 p-2 rounded-xl' alt='Product Image' />
                            <div className='flex flex-col justify-between'>
                                <h1 className=' font-Archivo font-bold'>{fave.name}</h1>
                                <p>{fave.manufacturer}</p>
                                <div className='flex flex-row'>
                                    <Link to={fave.url} target="_blank"><button className='bg-blue-200 h-10 rounded-lg p-1 w-24 hover:bg-blue-400 text-sm m-1'>Buy me</button></Link>
                                    <button onClick={() => remove(`${fave._id}`)} className='bg-red-400 text-sm rounded-lg p-1 m-1 w-24 h-10' >Remove</button>
                                </div>
                            </div>
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