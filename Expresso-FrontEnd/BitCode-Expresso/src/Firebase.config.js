// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkgmJlp_ASJRiv76k3AJ90rVomuHK36j4",
  authDomain: "bitcode-expresso.firebaseapp.com",
  projectId: "bitcode-expresso",
  storageBucket: "bitcode-expresso.firebasestorage.app",
  messagingSenderId: "968924193014",
  appId: "1:968924193014:web:7b63bcd8a8cf70141e8cd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)