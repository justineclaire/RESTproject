import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import "../App.css";
import { Message } from 'semantic-ui-react';
import { auth } from "../firebase";  
import Faves from './myfaves'

//login buttons and functions using google firebase auth
function Login() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [showFaves, setShowFaves] = React.useState(false);
  const [user, setUser] = useState({});

  //check for logged in user with firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
  
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: registerUsername
        });
  
        console.log(userCredential.user);
      }
  
      setErrorMessage('');
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("The email address is already in use");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("The email address is not valid.");
      } else if (error.code === "auth/operation-not-allowed") {
        setErrorMessage("Operation not allowed.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("The password is too weak.");
      }
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setErrorMessage('');
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setErrorMessage("This email does not have an account, please sign up");
      } else if (error.code === "auth/invalid-credential") {
        setErrorMessage("Error logging in. Please try again. Ensure you have the correct email and password");
      } else if (error.code === "auth/operation-not-allowed") {
        setErrorMessage("Operation not allowed.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password please try again");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  let [authMode, setAuthMode] = useState("signin")
    
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
        setLoginEmail("");
        setLoginPassword("");
        setRegisterEmail("");
        setRegisterPassword("");
    }
  

  if (user) {
    return(
      <div>
        <div className='flex flex-row items-center justify-center'>
          <div id='profbtn' className='mx-10'>
                <button onClick={() => setShowFaves(true)} className='flex flex-row px-3 py-1 text-black tracking-wide justify-between items-center rounded-lg bg-red-200 hover:bg-pink-100' >
                <span>My Faves</span>
                </button>
          </div>
        
            
            <div id='logbtn'>
                <button className='flex flex-row px-3 py-1 text-black tracking-wide justify-between items-center rounded-lg bg-red-200 hover:bg-pink-100' onClick={logout}>
                  
                  <span> Log out </span></button>
            </div>
        </div>

        {showFaves ? (
          <div>
          <div className="justify-center items-center flex flex-col justify-between overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] justify-between bg-white h-[650px] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-start justify-start p-5 h-5/6 w-5/6 items-center overflow-scroll border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold p-2 mb-3">{user.displayName}'s Favourite Products</h3>
                  <Faves currentUser={user} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowFaves(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        ) : null }

      </div>
    );

  }

  if(authMode === "signin") {
    return (
      <>
      <div id='logbtn'>
            <button className='flex flex-row px-3 py-1 text-black tracking-wide justify-between items-center rounded-lg bg-red-200 hover:bg-pink-100' type="button"
            onClick={() => setShowModal(true)}>
            <span className='font-ggoodfood px-3 xs:px-0'> Login </span></button>
      </div>
        

        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                     Login
                    </h3>
                    
                  </div>
                  {/*body*/}
                  <form className="p-5 m-2 font-Archivo">
                    
                    <div className="flex flex-col py-4">
                      <label className='mx-2' >Email address</label>
                      <input
                        className='p-2 border-2 rounded-lg'
                        placeholder="Email..."
                        type="email"
                        onChange={(event) => {
                            setLoginEmail(event.target.value);
                        }}
                        />
                    </div>

                    <div className="flex flex-col py-4">
                      <label className='mx-2'>Password</label>
                      <input
                        className='p-2 border-2 rounded-lg'
                        type="password"
                        placeholder="Password..."
                        onChange={(event) => {
                            setLoginPassword(event.target.value);
                        }}
                        />
                    </div>
                    <div>
                      <button className='flex flex-row px-2 py-4 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600 hover:bg-pink-600' type="button"
                        onClick={login}>
                        <span className='font-ggoodfood px-3 xs:px-0'>
                           Login 
                        </span></button>
                      {errorMessage && (
                      <Message color='red'>
                          {errorMessage}
                      </Message>
                      )}
                      
                    </div>
                  </form>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button className='flex flex-row px-2 py-4 border-2 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600 hover:bg-pink-600' type="button"
                        onClick={changeAuthMode}>
                        <span className='font-ggoodfood px-3 xs:px-0'>
                           Create Account </span>
                           </button>
                      
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );}

    return (
      <>
      <div id='logbtn'>
            <button className='flex flex-row px-7 py-5 text-white tracking-wide justify-between items-center h-full rounded-lg bg-pink-600 hover:bg-pink-200' type="button"
            onClick={() => setShowModal(true)}>
            <span className='font-ggoodfood px-3 xs:px-0'> Login </span></button>
      </div>

        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                     Sign Up
                    </h3>
                    
                  </div>
                  {/*body*/}
                  <form className="p-5 m-2 font-ggoodfood">

                  <div className="flex flex-col py-4">
                      <label className='mx-2' >Name</label>
                      <input
                        className='p-2 border-2 rounded-lg'
                        placeholder="Username..."
                        type="text"
                        onChange={(event) => {
                            setRegisterUsername(event.target.value);
                        }}
                        />
                    </div>
                 
                    <div className="flex flex-col py-4">
                      <label className='mx-2' >Email address</label>
                      <input
                        className='p-2 border-2 rounded-lg'
                        placeholder="Email..."
                        type="email"
                        onChange={(event) => {
                          setRegisterEmail(event.target.value);
                      }}
                        />
                    </div>

                    <div className="flex flex-col py-4">
                      <label className='mx-2'>Password</label>
                      <input
                        className='p-2 border-2 rounded-lg'
                        type="password"
                        placeholder="Password..."
                        onChange={(event) => {
                          setRegisterPassword(event.target.value);
                      }}
                        />
                    </div>
                    <div>
                      <button className='flex flex-row px-2 py-4 border-2 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600 hover:bg-pink-600' type="button"
                        onClick={register}>
                        <span className='font-ggoodfood px-3 xs:px-0'>
                           Create Account
                        </span></button>
                      {errorMessage && (
                      <Message color='red'>
                          {errorMessage}
                      </Message>
                      )}
                      
                    </div>
                  </form>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    
                    <button className='flex flex-row px-2 py-4 border-2 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600 hover:bg-pink-600' type="button"
                        onClick={changeAuthMode}>
                        <span className='font-ggoodfood px-3 xs:px-0'>
                           Existing account? </span></button>
                      
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );

};
  
export default Login;