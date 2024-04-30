import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, } from "firebase/auth";
import { auth } from "../firebase";
import axios from 'axios';
function Favourite({currentProduct, showConfirm}) {

    const [user, setUser] = useState({
        uid: '',
        name: '',
        faves: ['']
    });

    //error if not logged in
    //check for logged in user with firebase auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser({uid: currentUser.uid, name : currentUser.displayName});
            console.log(currentUser);
        });

        return () => {
        unsubscribe();
        };
    }, []);


    const handleFave = () => {
        if(user) {
            axios.post('http://localhost:8080/users', {prod: currentProduct._id, user: user})
          .then((res) => {
              console.log(res);
              showConfirm("Product added to favourites!");
              setTimeout(() => {showConfirm("")}, 5000);
          })
          .catch((err) => console.log(err));
        }

    }

    
    return(
        <div>
            { user? (
                <button onClick={() => { handleFave()}} className='px-5 py-1 w-full m-2 border-2 border-gray-400 rounded-lg bg-pink-300 m-2 hover:bg-pink-500'>Add to favourites</button>
            ) : null}
        </div>
    );
}

export default Favourite;
