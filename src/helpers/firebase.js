// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  // signInWithPopup,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  // signOut,
} from "firebase/auth";
import {
  getFirestore,
  // query,
  // where,
  // addDoc,
  // collection,
  // getDocs,
} from "firebase/firestore";
// import { getDatabase, ref, onValue} from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-XQws9ZqBONE0MvHDwJkduzmi5d7FcCc",
  authDomain: "cafemenu-50315.firebaseapp.com",
  projectId: "cafemenu-50315",
  storageBucket: "cafemenu-50315.appspot.com",
  messagingSenderId: "1037272402681",
  appId: "1:1037272402681:web:5713504f14532ecf5d3028",
  measurementId: "G-D7HS22LK1T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getDatabase(app)
const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export default db;
export { auth, provider };
