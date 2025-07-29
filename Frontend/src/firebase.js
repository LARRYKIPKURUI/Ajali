// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVkTm6WMoxFjuElfZPNgyr6MFJoqADYu0",
  authDomain: "ajaliapp-193d3.firebaseapp.com",
  projectId: "ajaliapp-193d3",
  storageBucket: "ajaliapp-193d3.firebasestorage.app",
  messagingSenderId: "992415078408",
  appId: "1:992415078408:web:ce318b51ff8a002f3dd9bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);