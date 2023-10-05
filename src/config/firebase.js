// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcqUAXqLmyioY3Qygms8tLqjMaA9mpzGQ",
  authDomain: "planr-8c393.firebaseapp.com",
  projectId: "planr-8c393",
  storageBucket: "planr-8c393.appspot.com",
  messagingSenderId: "83014791791",
  appId: "1:83014791791:web:3e9d6990ff3b44563e139a",
  measurementId: "G-NRW73757QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export {auth, provider, db}