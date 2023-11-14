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

// Add New Relationship
const addRelationship = async (data) => {
  const ref = doc(db, "relationships", uuidv4());
  await setDoc(ref, data, { merge: true });
  return data;
};

// Add Relationships in bulk
const addBulkRelationships = async (data) => {
  data?.map(async (e) => {
    const ref = doc(db, "relationships", uuidv4());
    await setDoc(ref, e, { merge: true });
  });
  return data;
};

// Get All Relationships
const getRelationships = async (user) => {
  const ref = collection(db, "relationships");
  const q = query(ref, where("user", "==", user))
  const res = await getDocs(q);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    res.docs.forEach((doc) => {
      docs.push({
        ...doc.data(),
        id: doc.id,
        dateEmailed: doc.data()?.dateEmailed?.toDate(),
        updatedAt: doc.data()?.updatedAt?.toDate()
      });
    });
    return docs;
  }
};

// Get All Relationships by date
const getRelationshipsByDate = async (date) => {
  const ref = collection(db, "relationships");
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

// Get All Relationships by date range
const getRelationshipsByDateRange = async (range) => {
  const ref = collection(db, "relationships");
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

// Update Relationship
const updateRelationship = async (id, relationship) => {
  const ref = doc(db, "relationships", id);
  await setDoc(ref, relationship, { merge: true });
  return {
    ...relationship,
    id,
  };
};

// Delete Relationship
const deleteRelationship = async (id) => {
  const ref = doc(db, "relationships", id);
  await deleteDoc(ref);
  return id;
};

const relationshipsApi = {
  addRelationship,
  getRelationships,
  updateRelationship,
  deleteRelationship,
  getRelationshipsByDate,
  getRelationshipsByDateRange,
  addBulkRelationships
};

export default relationshipsApi;
