// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgtEuxMfdyIhe5L2uadsL5uze1fHiH4nQ",
  authDomain: "mytodolist-53bd8.firebaseapp.com",
  databaseURL: "https://mytodolist-53bd8-default-rtdb.firebaseio.com",
  projectId: "mytodolist-53bd8",
  storageBucket: "mytodolist-53bd8.firebasestorage.app",
  messagingSenderId: "415107444771",
  appId: "1:415107444771:web:83ae0c8fb5a12365d38196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

export {db, auth};