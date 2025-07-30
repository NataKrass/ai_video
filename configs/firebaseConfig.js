// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-video-gen-73331.firebaseapp.com",
  projectId: "ai-video-gen-73331",
  storageBucket: "ai-video-gen-73331.firebasestorage.app",
  messagingSenderId: "22825449421",
  appId: "1:22825449421:web:116b9d03aa46feaa497684",
  measurementId: "G-6KZ8X53Z8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);