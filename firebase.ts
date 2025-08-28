// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIkyXcKnFrIS7yEkTCpZcixUKhdsJdHc4",
  authDomain: "taskmanagementapp-2aff3.firebaseapp.com",
  projectId: "taskmanagementapp-2aff3",
  storageBucket: "taskmanagementapp-2aff3.firebasestorage.app",
  messagingSenderId: "86707524538",
  appId: "1:86707524538:web:81fd0830c287db70390383"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)