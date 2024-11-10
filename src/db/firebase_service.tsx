// src/firebase.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfWs6xhhIiG_8wzeOBLzwVLqVvcsY9ZV0",
  authDomain: "bu-calendar-dev.firebaseapp.com",
  projectId: "bu-calendar-dev",
  storageBucket: "bu-calendar-dev.firebasestorage.app",
  messagingSenderId: "230620443219",
  appId: "1:230620443219:web:b17b8e21538408cc224ca6",
  measurementId: "G-DLM2VN0SGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app;
