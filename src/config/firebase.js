import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyC-958cBYuTb_N_8fPBtQPVFEmsqd7HYXg",
  authDomain: "influence-11524.firebaseapp.com",
  projectId: "influence-11524",
  storageBucket: "influence-11524.appspot.com",
  messagingSenderId: "149063262319",
  appId: "1:149063262319:web:705d10cf8328b931bb6d9a"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const realtimeDB = getDatabase(app);