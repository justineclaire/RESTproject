import React, { useEffect, useState } from 'react';

//search bar component
function Insert({products}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [userProduct, setUserProduct] = useState({
        name: '',
        type: '',
        price: 0,
        upc: '',
        category: [],
        shipping: 0,
        description: '',
        manufacturer: '',
        model: '',
        url: '',
        image: '',
    });
    var distinctTypes = []
    var distinctCats = []
    for (var i = 0; i < products.length; i++) {
        if (!distinctTypes.includes(products[i].type)) {
            distinctTypes.push(products[i].type);
        }

        for(var j = 0; j < products[i].category.length; j++){
            if (!distinctCats.includes(products[i].category[j].name)) {
                distinctCats.push(products[i].category[j].name);
            }
        }
        
    }

    const handleInsert = () => {

    }





    return(
        <div>
            <button onClick={() => setModalOpen(true)} className='px-5 py-1 border-2 border-gray-400 rounded-lg bg-yellow-200 m-2 hover:bg-yellow-500'>Insert</button>

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
                    <form className="p-5 m-2 font-Archivo">
                      
                      <div className="flex flex-col py-4">
                        <label className='mx-2'>Product Name:</label>
                        <input
                          className='p-2 border-2 rounded-lg'
                          placeholder="Name..."
                          type="text"
                          />
                      </div>
                      <div className="flex flex-col py-4">
                        <label className='mx-2'>Manufacturer:</label>
                        <input
                          className='p-2 border-2 rounded-lg'
                          placeholder="Name..."
                          type="text"
                          />
                      </div>
                      <div className="flex flex-col py-4">
                        <label className='mx-2'>Product Type:</label>
                        <select className='overflow-visible' id="type" name="type">
                                {distinctTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                        
                        </select>
                      </div>

                      
                      <label className="relative"> Product Categories:
                        <input type="checkbox" className="hidden peer" />
                            {"Show the dropdown"}

                        <div className="absolute bg-white overflow-scroll h-48 border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                            <ul>
                            {distinctCats.map((option, i) => {
                                return (
                                <li key={option}>
                                    <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                        <input
                                            type="checkbox"
                                            name="category"
                                            value={option}
                                            className="cursor-pointer"
                                        />
                                        <span className="ml-1">{option}</span>
                                    </label>
                                </li>
                            );
                            })}
                            </ul>
                        </div>
                    </label>

                      <div className="flex flex-col py-4">
                        <label className='mx-2'>Product Category:</label>
                        <select className='overflow-scroll' id="type" name="type">
                                {distinctCats.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                        
                        </select>
                      </div>
                      
                      <div>
                        <button className='flex flex-row px-2 py-4 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600 hover:bg-pink-600' type="button"
                          >
                          <span className='font-ggoodfood px-3 xs:px-0'>
                             Submit
                          </span></button>
                      
                        
                      </div>
                    </form>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
