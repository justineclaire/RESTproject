// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASlzCCgespqHr2bnaMdzp_Zb-hxlcE5Ho",
  authDomain: "enterpriseappdev-31dc0.firebaseapp.com",
  projectId: "enterpriseappdev-31dc0",
  storageBucket: "enterpriseappdev-31dc0.appspot.com",
  messagingSenderId: "72104586066",
  appId: "1:72104586066:web:a0fd920017af9f821be88b",
  measurementId: "G-N1H574VQXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;