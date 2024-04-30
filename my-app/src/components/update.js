import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Update({toggleIsDisabled, toggleRefresh, clicked, currentProduct, showError, showConfirm}) {
    
    const handleUpdate = () => {
        // Check for empty fields
        const emptyFields = Object.values(currentProduct).filter(value => value === '');
        if (emptyFields.length > 0) {
          showError("Please fill in all fields");
          setTimeout(() => {showError("")}, 5000);
          return;
        }

        // Check if price matches the regex
        if (!/^\d*\.?\d*$/.test(currentProduct.price)) {
          showError("Please enter a valid price");
          setTimeout(() => {showError("")}, 5000);
          return;
        }

         // Check if price matches the regex
         if (!/^\d*\.?\d*$/.test(currentProduct.shipping)) {
            showError("Please enter valid shipping");
            setTimeout(() => {showError("")}, 5000);
            return;
          }

        if(emptyFields.length == 0) {
          axios.post('http://localhost:8080/products', {prod: currentProduct})
          .then((res) => {
              console.log(res);
              showConfirm("Product updated!");
              setTimeout(() => {showConfirm("")}, 5000);
          })
          .catch((err) => console.log(err));
        }

    }
    return(
        <div>
            <button onClick={clicked ? () => { toggleIsDisabled(); handleUpdate(); toggleRefresh(); } : toggleIsDisabled} className={`px-5 py-1 border-2 border-gray-400 rounded-lg bg-yellow-200 w-full m-2 ${clicked ? 'bg-green-200 hover:bg-green-500' : 'bg-yellow-200 hover:bg-yellow-500'}`} >{clicked ? "Press again to update" : "Update"}</button>
            
        </div>
    );
}

export default Update;
