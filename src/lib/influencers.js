import planUsage from "@/constants/plan";
import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const favouriteInfluencer = async (data) => {
  const ref = collection(db, "favourites");
  const q = query(
    ref,
    where("platform_username", "==", data?.platform_username)
  );
  const res = await getDocs(q);
  if (res.empty) {
    const addRef = doc(db, "favourites", uuidv4());
    await setDoc(addRef, data, { merge: true });
  } else {
    res.docs.forEach(async (e) => {
      const delRef = doc(db, "favourites", e.id);
      await deleteDoc(delRef);
    });
  }
};
const bookmarkInfluencer = async (data) => {
  const ref = collection(db, "bookmarks");
  const q = query(
    ref,
    where("platform_username", "==", data?.platform_username)
  );
  const res = await getDocs(q);
  if (res.empty) {
    const addRef = doc(db, "bookmarks", uuidv4());
    await setDoc(addRef, data, { merge: true });
  } else {
    res.docs.forEach(async (e) => {
      const delRef = doc(db, "bookmarks", e.id);
      await deleteDoc(delRef);
    });
  }
};

const getFavourites = async (userId) => {
  const ref = collection(db, "favourites");
  const q = query(ref, where("userId", "==", userId));
  const res = await getDocs(q);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    res.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  }
};

const getBookmarks = async (userId) => {
  const ref = collection(db, "bookmarks");
  const q = query(ref, where("userId", "==", userId));
  const res = await getDocs(q);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    res.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  }
};

// Get All Plans
const getPlans = async () => {
  const ref = collection(db, "plans");
  const res = await getDocs(ref);
  let docs = [];
  res.docs.forEach((doc) => {
    docs.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return docs;
};

const getUserPlan = async (userId) => {
  const ref = collection(db, "payments");
  let q = query(ref, where("userId", "==", userId));
  q = query(q, where("status", "==", "paid"));
  const res = await getDocs(q);

  if (!res.empty) {
    const data = {
      ...res.docs[0]?.data(),
      id: res.docs[0]?.id,
      expiryDate: res.docs[0]?.data()?.expiryDate?.toDate(),
      purchaseDate: res.docs[0]?.data()?.purchaseDate?.toDate(),
    };
    return data;
  } else {
    return "Not found";
  }
};

const updateUsage = async (userId, type) => {
  // const ref = collection(db, "payments");
  // let q = query(ref, where("userId", "==", userId));
  // const res = await getDocs(q);
  // const updateRef = doc(db, "payments", res.docs[0]?.id);
  // const data = { ...res.docs[0]?.data(), id: res.docs[0]?.id };
  const ref = doc(db, "users", userId);
  const res = await getDoc(ref);
  const data = { ...res.data(), id: res.id };
  if (type === planUsage.INFLUENCER_PROFILE_ANALYSIS) {
    await setDoc(
      ref,
      {
        influencerProfileAnalysis: Number(data?.influencerProfileAnalysis) - 1,
      },
      { merge: true }
    );
  } else if (type === planUsage.POST_ANALYSIS) {
    await setDoc(
      ref,
      {
        monitorPosts: Number(data?.monitorPosts) - 1,
      },
      { merge: true }
    );
  }
  return true;
};

const influencersApi = {
  favouriteInfluencer,
  bookmarkInfluencer,
  getFavourites,
  getBookmarks,
  getPlans,
  getUserPlan,
  updateUsage,
};

export default influencersApi;
