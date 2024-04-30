import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import axios from 'axios';
import Insert from './insert.js';
import Delete from './Delete.js';
import Update from './update.js';
import Favourite from './favourite.js';

//search bar component
function Catalogue() {

    const [products, setProducts] = useState({});
    const [refresh, setRefresh] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [current, setCurrent] = useState(0);
    const [currentProduct, setCurrentProduct] = useState({});
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");

    
    useEffect(() => {
        axios.get(`http://localhost:8080/products`) 
        .then((res) => {
            setProducts(res.data);
        })
        .catch((err) => console.log(err));
        
    }, [refresh]);

    useEffect(() => {
        setCurrentProduct(products[current] || {});
    }, [current, products]);

    const showError = (message) => {
        setError(message);
    }

    const showConfirm = (message) => {
        setConfirm(message);
    }

    //next product
    const handleNext = () => {
        setCurrent(current + 1);
    };

    //first product
    const handleFirst = () => {
        setCurrent(0);
    };

    //last product
    const handleLast = () => {
        setCurrent(products.length - 1);
    };

    //previous product
    const handlePrevious = () => {
        setCurrent(current - 1);
    };

    const toggleIsDisabled = () => {
        setIsDisabled(!isDisabled);
        setClicked(!clicked);
    };

    const toggleRefresh = () => {
        setRefresh(!refresh);
    }
   
    //change id with search bar and update page

    //favourite an item with auth! save uid and then ids of products in a faves array!

    return(
        <div className='flex flex-col flex-wrap bg-white border-2 border-gray-200 w-5/6 items-center h-full p-7'>
            <h1 className='font-ggoodfood bg-red-100 px-10 py-3 m-2'>Test the REST Microservice server!</h1>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col px-8 mt-4'>
                    <Insert toggleRefresh={toggleRefresh}/>
                    <Update toggleIsDisabled={toggleIsDisabled} toggleRefresh={toggleRefresh} clicked={clicked} currentProduct={currentProduct} showError={showError} showConfirm={showConfirm}/>
                    <Delete currentProduct={currentProduct} showConfirm={showConfirm} toggleRefresh={toggleRefresh}/>
                    <Favourite/>
                </div>

                <div>
                <div className='flex flex-col items-center'>
                <Message negative className='text-red-500 rounded-lg'>{error}</Message>
                <Message negative className='text-green-500 rounded-lg'>{confirm}</Message>
                    <label>Name:</label>
                    <input className='border-2 w-80 h-22 disabled:border-gray-100 rounded-lg border-blue-500 text-wrap p-5' disabled={isDisabled} type='text' value={currentProduct.name || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}>
                    
                    </input>
                    <label>sku:</label>
                    <input className='border-2 w-80 h-10 disabled:border-gray-100 rounded-lg border-blue-500 p-2' type='text' disabled={isDisabled} value={currentProduct.sku || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}>
                        
                    </input>
                    <label>Brand:</label>
                    <input className='border-2 w-80 h-10 disabled:border-gray-100 rounded-lg border-blue-500 p-2' disabled={isDisabled} type='text' value={currentProduct.manufacturer || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, manufacturer: e.target.value })}>
                        
                    </input>
                    <label>Price:</label>
                    <input className='border-2 w-80 h-10 disabled:border-gray-100 rounded-lg border-blue-500 p-2' disabled={isDisabled} type='text' value={currentProduct.price || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}>
                        
                    </input>
                    <label>Shipping Cost:</label>
                    <input className='border-2 w-80 h-10 disabled:border-gray-100 rounded-lg border-blue-500 p-2' disabled={isDisabled} type='text' value={currentProduct.shipping || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, shipping: e.target.value })}>
                        
                    </input>
                    <label>Image:</label>
                    <img className='w-64 h-64' src={products && products[current] ? products[current].image : null} alt='Product' />
                </div>


                    <div className='flex flex-row justify-between'>
                        <button className='bg-yellow-200 rounded-lg p-1 hover:bg-yellow-500' onClick={handlePrevious}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
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
