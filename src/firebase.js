import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrtFmqfsdb7M7t94n27N_AedOharmPtjk",
  authDomain: "sample-66d04.firebaseapp.com",
  projectId: "sample-66d04",
  storageBucket: "sample-66d04.firebasestorage.app",
  messagingSenderId: "808289441304",
  appId: "1:808289441304:web:9bf1459935be6f26e9556d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
