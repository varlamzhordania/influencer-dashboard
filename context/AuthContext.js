import Loader from "@/components/Loader";
import { auth, db } from "@/config/firebase";
import dayjs from "dayjs";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const { createContext, useContext, useEffect, useState } = require("react");

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const res = await getDoc(ref);
        setUser({
          uid: user.uid,
          ...res.data(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const ref = doc(db, "users", data?.user?.uid);
    const res = await getDoc(ref);
    return { ...res.data(), id: data?.user?.uid };
  };

  const signUp = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        const data = {
          firstName: values?.firstName,
          lastName: values?.lastName,
          phone: values?.phone,
          email: values?.email,
          active: true,
          influencerSelection: 5,
          influencerProfileAnalysis: 3,
          monitorPosts: 3,
          campaignUsage: 2,
          trialVersion: true,
          purchaseDate: serverTimestamp(),
          expiryDate: dayjs().add(7, "days").toDate(),
        };
        await setDoc(userRef, data, { merge: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
