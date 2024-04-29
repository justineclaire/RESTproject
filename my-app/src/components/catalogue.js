import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Insert from './insert.js';
import Delete from './Delete.js';
import Update from './update.js';
import Favourite from './favourite.js';

//search bar component
function Catalogue({products}) {

    const [current, setCurrent] = useState(0);
    console.log(products);
    

    //next product
    const handleNext = () => {
        setCurrent(current + 1);
    };

    const handleFirst = () => {
        setCurrent(0);
    };

    const handleLast = () => {
        setCurrent(products.length - 1);
    };

    //previous product
    const handlePrevious = () => {
        setCurrent(current - 1);
    };

    //change id with search bar and update page

    //favourite an item with auth! save uid and then ids of products in a faves array!

    return(
        <div className='flex flex-col flex-wrap bg-white border-2 border-gray-200 w-5/6 items-center h-full p-7'>
            <h1 className='font-ggoodfood bg-red-100 px-10 py-3 m-2'>Test the REST Microservice server!</h1>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col px-8'>
                    <Insert products={products}/>
                    <Update/>
                    <Delete/>

                    <Favourite/>
                </div>

                <div>
                <div className='flex flex-col items-center'>
    <label>Name:</label>
    <span className='border-2 w-80 h-22 border-gray-400 rounded-sm text-wrap p-5' type='text'>
        {products && products[current] ? products[current].name : null}
    </span>
    <label>id:</label>
    <span className='border-2 w-80 h-10 border-gray-400 rounded-sm p-2' type='text'>
        {products && products[current] ? products[current].sku : null}
    </span>
    <label>Brand:</label>
    <span className='border-2 w-80 h-10 border-gray-400 rounded-sm p-2' type='text'>
        {products && products[current] ? products[current].manufacturer : null}
    </span>
    <label>Price:</label>
    <span className='border-2 w-80 h-10 border-gray-400 rounded-sm p-2' type='text'>
        {products && products[current] ? products[current].price : null}
    </span>
    <label>Image:</label>
    <img className='w-64 h-64' src={products && products[current] ? products[current].image : null} alt='Product' />
</div>


                    <div className='flex flex-row justify-between'>
                        <button className='bg-yellow-200 rounded-lg p-1 hover:bg-yellow-500' onClick={handlePrevious}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                        </button>

                        <button className='bg-yellow-200 rounded-lg p-1 hover:bg-yellow-500' onClick={handleFirst}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                            </svg>
                        </button>

                        <button className='bg-yellow-200 rounded-lg p-1 hover:bg-yellow-500' onClick={handleLast}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <button className='bg-yellow-200 rounded-lg p-1 hover:bg-yellow-500' onClick={handleNext}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Catalogue
