// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMuM7Z7gFH-Z5wZIXc9bgZfWlekA7f0ek",
  authDomain: "phongperfume-5c821.firebaseapp.com",
  projectId: "phongperfume-5c821",
  storageBucket: "phongperfume-5c821.firebasestorage.app",
  messagingSenderId: "434678888462",
  appId: "1:434678888462:web:e8158427b2a455f544245f",
  measurementId: "G-ZWGB5NJSF4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const storage = getStorage();
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();
