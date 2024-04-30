import React, { useEffect, useState } from 'react';
import axios from 'axios';

//search bar component
function Search() {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    
    useEffect(() => {
        if (search.length > 1) {
            axios.get(`http://localhost:8080/search/${search}`)
            .then((res) => {
                setResults(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        }

        if (search.length === 0) {
            setResults([]);
        }
    }, [search]); 

    return (
        <div className='flex flex-col h-max font-Archivo relative'>
            <div className='flex flex-row items-center justify-center'>
                <input
                    className='p-2 rounded-xl mb-2 h-8 sm:w-96 px-8 py-5 m-5 xs:w-64 bg-white text-slate-700'
                    placeholder="Search for a Product by name or UPC..."
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    />
                
            </div>
           <ul className=' absolute z-10 mt-20 bg-white rounded-lg divide-y divide-slate-700'>
                {results.slice(0,3).map((result) => (
                    <div className='flex flex-col p-5 hover:bg-amber-100'>
                        
                        <span
                            className='font-text-700' key={result.id}>
                            <h1 className='text-sm'>{result.name}</h1>
                            <p className=' text-xs overflow-hidden w-1/2'>{result.info}</p>
                        </span>
                    </div>
                ))}
            </ul>
        
    </div>
    );
}

export default Search;