import React, { useEffect, useState } from 'react';
import categories from './categories.json';
import _ from 'lodash';
import { Message, Input, Dropdown  } from 'semantic-ui-react'
import axios from 'axios';

//search bar component
function Insert({products}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [selectedCats, setSelectedCats] = useState([]);
    const [userProduct, setUserProduct] = useState({
        name: '',
        type: '',
        price: 0.0,
        sku: '',
        upc: '',
        category: selectedCats,
        shipping: 0,
        description: '',
        manufacturer: '',
        model: '',
        url: '',
        image: '',
    });

    //console.log(userProduct);
    
    var distinctTypes = []
    for (var i = 0; i < products.length; i++) {
        if (!distinctTypes.includes(products[i].type)) {
            distinctTypes.push(products[i].type);
        }
    }

    useEffect(() => {
      setUserProduct(prevState => ({
        ...prevState,
        category: selectedCats
      }));
    }, [selectedCats]);

     // Handler function for checkbox change
     const handleCheckboxChange = (option, event) => {
      const { value, checked } = event.target;
      if (checked) {
          // If checkbox is checked, add the value to selectedCategories
          setSelectedCats([...selectedCats, option]);
      } else {
          // If checkbox is unchecked, remove the value from selectedCategories
          setSelectedCats(selectedCats.filter(category => _.isEqual(category, option)));
      }
     
  };


    const handleInsert = () => {
        // Check for empty fields
        const emptyFields = Object.values(userProduct).filter(value => value === '');
        if (emptyFields.length > 0) {
          setError("Please fill in all fields");
          setTimeout(() => {setError("")}, 5000);
          return;
        }

        // Check if price matches the regex
        if (!/^\d*\.?\d*$/.test(userProduct.price)) {
          setError("Please enter a valid price");
          setTimeout(() => {setError("")}, 5000);
          return;
        }

        if(emptyFields.length == 0) {
          axios.put('http://localhost:8080/products', {prod: userProduct})
          .then((res) => {
              console.log(res);
              setModalOpen(false);
          })
          .catch((err) => console.log(err));
        }

    }
    
    return(
        <div>
            <button onClick={() => setModalOpen(true)} className='px-5 py-1 m-2 border-2 border-gray-400 rounded-lg bg-yellow-200 w-full hover:bg-yellow-500'>Insert</button>

            {modalOpen ? (
                <div>
                <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                       Insert a new product
                      </h3>
                      
                    </div>
                    {/*body*/}
                    <form className="flex flex-row p-5 m-2 font-Archivo">
                      
                    <div className='flex flex-col justify-between p-5'>
                        <div className="flex flex-col py-4">
                          <label className='mx-2'>Product Name:</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="Name..."
                            type="text"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                name: event.target.value
                              }));
                            }}
                            />
                        </div>
                        <div className="flex flex-col py-4">
                          <label className='mx-2'>Manufacturer:</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="Brand..."
                            type="text"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                manufacturer: event.target.value
                              }));
                            }}
                            />
                        </div>

                 

                        <div className="flex flex-col py-4">
                          <label className='mx-2'>Product Type:</label>
                          <select className='overflow-visible border-2 border-gray-200 p-3 rounded-lg' id="type" name="type"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                type: event.target.value
                              }));
                            }} >
                                  {distinctTypes.map((type) => (
                                      <option key={type} value={type}>{type}</option>
                                  ))}
                          
                          </select>
                        </div>

                      
                        <label>Product Categories:</label>
                        <label className="relative border-2 border-gray-200 p-2 rounded-lg">
                          <input type="checkbox" className="hidden peer p-3 border-2 border-gray-400" />
                              <span className='flex flex-row justify-between'>Click for dropdown<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className="w-3 h-3 mt-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
</span>

                          <div className="absolute bg-white overflow-scroll h-64 w-80 border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                              <ul>
                              {categories.map((option, i) => {
                                  return (
                                  <li >
                                      <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                          <input
                                              type="checkbox"
                                              name="category"
                                              value={option}
                                              className="cursor-pointer"
                                              onChange={(event) => handleCheckboxChange(option, event)}
                                          />
                                          <span className="ml-1">{option.name}</span>
                                      </label>
                                  </li>
                              );
                              })}
                              </ul>
                          </div>
                      </label>

                      <div className="flex flex-col py-4">
                          <label className='mx-2'>Model:</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="Model..."
                            type="text"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                model: event.target.value
                              }));
                            }}
                            />
                        </div>

                        <div className="flex flex-col py-4">
                          <label className='mx-2'>Description:</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="Description..."
                            type="textbox"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                description: event.target.value
                              }));
                            }}
                            />
                        </div>

                    </div>{/*end first column*/}
                   
                    
                    <div className='flex flex-col justify-between p-5'>
                        <div className="flex flex-col py-4">
                          <label className='mx-2'>Price:</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="Price..."
                            type="text"
                            onChange={(event) => {
                              const inputValue = event.target.value;
                              if (/^\d*\.?\d*$/.test(inputValue)) { // Checks if the input consists of digits and at most one dot
                                setUserProduct(prevState => ({
                                  ...prevState,
                                  price: inputValue
                                }));
                                setError("");
                              } else {
                                setError("Please only input numbers");
                                setTimeout(() => {setError("")}, 3000);
                              }
                            }}
                            />
                        </div>

                        <div className="flex flex-col py-4">
                          <label className='mx-2'>Shopping Link:</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="Shopping url..."
                            type="text"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                url: event.target.value
                              }));
                            }}
                            />
                        </div>

                        <div className="flex flex-col py-4">
                          <label className='mx-2'>Image Link:</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="Image url..."
                            type="text"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                image: event.target.value
                              }));
                            }}
                            />
                        </div>

                        <div className="flex flex-col py-4">
                          <label className='mx-2'>UPC (universal product code):</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="upc..."
                            type="text"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                upc: event.target.value
                              }));
                            }}
                            />
                        </div>

                        <div className="flex flex-col py-4">
                          <label className='mx-2'>SKU (stock keeping unit):</label>
                          <input
                            className='p-2 border-2 rounded-lg'
                            placeholder="sku..."
                            type="text"
                            onChange={(event) => {
                              setUserProduct(prevState => ({
                                ...prevState,
                                sku: event.target.value
                              }));
                            }}
                            />
                        </div>

                        <div>
                        <button className='flex flex-row px-2 py-4 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600 hover:bg-pink-600' type="button"
                         onClick={handleInsert}
                         >
                          <span className='font-ggoodfood px-3 xs:px-0'>
                             Submit
                          </span></button>
                      </div>
                    </div>
                      
                    </form>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <Message negative className='text-red-500 rounded-lg'>{error}</Message>
                      <button
                        className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModalOpen(false)}
                      >
                        Close
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </div>
            ) : null}
        
        </div>
    );
}

export default Insert;
