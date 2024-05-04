// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZpOSt_yDCnbMJCz1P1NngKbP5LZNp9GA",
  authDomain: "personal-finance-tracker-1652d.firebaseapp.com",
  projectId: "personal-finance-tracker-1652d",
  storageBucket: "personal-finance-tracker-1652d.appspot.com",
  messagingSenderId: "724237616966",
  appId: "1:724237616966:web:54e2d9a30948094a09c747",
  measurementId: "G-NFKD6GJV4Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
