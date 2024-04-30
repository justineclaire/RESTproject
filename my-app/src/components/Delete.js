import React, { useEffect, useState } from 'react';
import axios from 'axios';

//search bar component
function Delete({currentProduct, showConfirm, toggleRefresh}) {

    
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = () => {

          axios.delete(`http://localhost:8080/products/${currentProduct._id}`)
          .then((res) => {
              console.log(res);
              showConfirm("Deleting");
              setTimeout(() => {
                  toggleRefresh();
                  showConfirm(`Product ${currentProduct.sku} deleted!`);
                  setTimeout(() => { showConfirm("") }, 5000);
              }, 8000);
          })
          .catch((err) => console.log(err));
        
    }
    return(
        <div>
            <button onClick={() => setModalOpen(true)} className='px-5 py-1 m-2 border-2 border-gray-400 rounded-lg bg-yellow-200 w-full hover:bg-yellow-500'>Delete</button>

            {modalOpen && currentProduct ? (
                <div>
                <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-6 outline-none focus:outline-none">
                    
                    {/*body*/}
                    <div className='flex flex-col font-Archivo'>
                        <h1> {`Are you sure you want to delete "${currentProduct.name}" ?`} </h1>

                        <div className='flex flex-row justify-center'>
                            <button className='bg-blue-500 rounded-lg m-2 w-14 h-10' onClick={() => { handleDelete(); setModalOpen(false);}}>Yes</button>
                            <button className='bg-blue-500 rounded-lg m-2 w-14 h-10' onClick={() => setModalOpen(false)}>No</button>
                        </div>
                    </div>
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

export default Delete;
