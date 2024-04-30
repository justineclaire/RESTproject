import React, { useEffect, useState } from 'react';

//search bar component
function Update({clicked}) {

    return(
        <div>
            <button className='px-5 py-1 border-2 border-gray-400 rounded-lg bg-yellow-200 w-full m-2 hover:bg-yellow-500'>{clicked ? "Press again to update" : "Update"}</button>
            
        </div>
    );
}

export default Update;
