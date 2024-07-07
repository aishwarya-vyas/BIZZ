// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDryxaRtWvsBMFmLSYGWdqC1jxezEsIn3s",
  authDomain: "business-app-7ee6e.firebaseapp.com",
  projectId: "business-app-7ee6e",
  storageBucket: "business-app-7ee6e.appspot.com",
  messagingSenderId: "264419772891",
  appId: "1:264419772891:web:f92b962df675f2bc3abffe",
  measurementId: "G-2QW5P1JGRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
export const storage = getStorage(app)
// const analytics = getAnalytics(app);