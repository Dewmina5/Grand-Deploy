// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "grant-management-d5811.firebaseapp.com",
  projectId: "grant-management-d5811",
  storageBucket: "grant-management-d5811.appspot.com",
  messagingSenderId: "437769608545",
  appId: "1:437769608545:web:ac0b52342dbe24336ab920"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

