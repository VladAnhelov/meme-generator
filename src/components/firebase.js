import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAP5vksOjItPi7WAg4pbKmd4gISQvn06fI",
  authDomain: "meme-generator-vlad.firebaseapp.com",
  databaseURL: "https://meme-generator-vlad-default-rtdb.firebaseio.com",
  projectId: "meme-generator-vlad",
  storageBucket: "meme-generator-vlad.appspot.com",
  messagingSenderId: "996673821252",
  appId: "1:996673821252:web:a9403cf92133561736fa11",
  measurementId: "G-XKCSJJCZ5D",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  storage,
  sendPasswordResetEmail,
};
