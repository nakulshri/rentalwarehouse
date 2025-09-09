import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCoutws3NQn11pkh7S99HxMqpM0nJ5KpA",
  authDomain: "rentalco.firebaseapp.com",
  projectId: "rentalco",
  storageBucket: "rentalco.firebasestorage.app",
  messagingSenderId: "94644487380",
  appId: "1:94644487380:web:3e34f9b026600ba980e741",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 