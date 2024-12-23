import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXmNSds22Mjbeb_iK8NsDIBuP9I95-M4Y",
  authDomain: "fintracker-65cfa.firebaseapp.com",
  projectId: "fintracker-65cfa",
  storageBucket: "fintracker-65cfa.firebasestorage.app",
  messagingSenderId: "564797276803",
  appId: "1:564797276803:web:1d5aeb517dd3ba0ff691b6",
  measurementId: "G-PX145EHP5V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
