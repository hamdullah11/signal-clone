import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtho-ZBEfJZr0bIYyc_plPVnxtF5c6De4",
  authDomain: "signal-app-b8713.firebaseapp.com",
  projectId: "signal-app-b8713",
  storageBucket: "signal-app-b8713.appspot.com",
  messagingSenderId: "643511175006",
  appId: "1:643511175006:web:6f3f015c0daa7cabdc31cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
