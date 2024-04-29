import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, } from "firebase/auth";
import { auth } from "../firebase";

function Favourite() {

    const [user, setUser] = useState({});

    //error if not logged in
    //check for logged in user with firebase auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        
        });

        return () => {
        unsubscribe();
        };
    }, []);
    return(
        <div>
            { user? (
                <button className='px-5 py-1 border-2 border-gray-400 rounded-lg bg-pink-300 m-2 hover:bg-pink-500'>Add to favourites</button>
            ) : null}
        </div>
    );
}

export default Favourite;
