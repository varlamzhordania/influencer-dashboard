import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyDe6SH_nH4xmWhBs2-wZw5YX9Hh__b4VPw",
  authDomain: "influencer-391217.firebaseapp.com",
  projectId: "influencer-391217",
  storageBucket: "influencer-391217.appspot.com",
  messagingSenderId: "1035208711318",
  appId: "1:1035208711318:web:996db5eb7ad3cb509ff6b7",
  measurementId: "G-GEZDFPPN3N"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const realtimeDB = getDatabase(app);