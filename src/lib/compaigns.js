import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Add New Compaign
const addCompaign = async (data) => {
  const ref = doc(db, "compaigns", uuidv4());
  await setDoc(ref, data, { merge: true });

  const userRef = doc(db, "users", data?.userId)
  const userRes = await getDoc(userRef)
  const usageData = {...userRes.data(), id: userRes.id}
  // const usageRef = collection(db, "payments");
  // let q = query(usageRef, where("userId", "==", data?.userId));
  // const res = await getDocs(q);
  // const updateRef = doc(db, "payments", res.docs[0]?.id);
  // const usageData = { ...res.docs[0]?.data(), id: res.docs[0]?.id };
  await setDoc(
    userRef,
    {
      campaignUsage: Number(usageData?.campaignUsage) - 1,
    },
    { merge: true }
  );
  return data;
};

// Add Compaigns in bulk
const addBulkCompaigns = async (data) => {
  data?.map(async (e) => {
    const ref = doc(db, "compaigns", uuidv4());
    await setDoc(ref, e, { merge: true });
  });
  return data;
};

// Get All Compaigns
const getCompaigns = async (user) => {
  const ref = collection(db, "compaigns");
  const q = query(ref, where("userId", "==", user));
  const res = await getDocs(q);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    res.docs.forEach((doc) => {
      docs.push({
        ...doc.data(),
        id: doc.id,
        createdOn: doc.data()?.createdOn?.toDate(),
        createdAt: doc.data()?.createdAt?.toDate(),
        updatedAt: doc.data()?.updatedAt?.toDate(),
      });
    });
    return docs;
  }
};

// Get All Compaigns by date
const getCompaignsByDate = async (date) => {
  const ref = collection(db, "compaigns");
  const q = query(ref, where("date", "==", date));
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

// Get All Compaigns by date range
const getCompaignsByDateRange = async (range) => {
  const ref = collection(db, "compaigns");
  const res = await getDocs(ref);
  let docs = [];
  res.docs.forEach((doc) => {
    if (
      new Date(doc.data().date) >= new Date(range?.start) &&
      new Date(doc.data().date) <= new Date(range?.end)
    ) {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    }
  });
  return docs;
};

// Update Compaign
const updateCompaign = async (id, compaign) => {
  const ref = doc(db, "compaigns", id);
  await setDoc(ref, compaign, { merge: true });
  return {
    ...compaign,
    id,
  };
};

// Delete Compaign
const deleteCompaign = async (id) => {
  const ref = doc(db, "compaigns", id);
  await deleteDoc(ref);
  return id;
};

const compaignsApi = {
  addCompaign,
  getCompaigns,
  updateCompaign,
  deleteCompaign,
  getCompaignsByDate,
  getCompaignsByDateRange,
  addBulkCompaigns,
};

export default compaignsApi;
