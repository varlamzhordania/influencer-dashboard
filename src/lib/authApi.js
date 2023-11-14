import { doc, getDoc, setDoc } from "firebase/firestore";

const { auth, db } = require("@/config/firebase");
const { signOut } = require("firebase/auth");

// Get user
const getUser = async (id) => {
  const ref = doc(db, "users", id);
  const res = await getDoc(ref);
  return { ...res.data(), id: res.id };
};

// Update user
const updateUser = async (id, data) => {
  const ref = doc(db, "users", id);
  await setDoc(ref, data, { merge: true });

  return data;
};

// Update user profile picture
const updateUserPicture = async (id, data) => {
  const ref = doc(db, "users", id);
  await setDoc(ref, {profilePicture: data}, { merge: true });

  return data;
};

// Logout user
const logout = async () => {
  await signOut(auth)
    .then(() => console.log("logout"))
    .catch((e) => console.log("error", e));
};

const authApi = {
  getUser,
  updateUser,
  updateUserPicture,
  logout,
};

export default authApi;
