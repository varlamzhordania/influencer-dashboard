import dayjs from "dayjs";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const addPayment = async (plan, userId) => {
  const duration = plan?.duration;
  let expiryDate = null;
  const purchaseDate = dayjs().toDate();
  if (duration === "Monthly") {
    expiryDate = dayjs().add(1, "month").toDate();
  } else if (duration === "Yearly") {
    expiryDate = dayjs().add(1, "year").toDate();
  }
  const ref = doc(db, "payments", plan?.sessionId);
  await setDoc(
    ref,
    {
      plan: plan?.name,
      duration: plan?.duration,
      desc: plan?.desc,
      purchaseDate,
      expiryDate,
      userId,
      status: "unpaid",
      amount: Number(plan?.price),
      purpose: "Purchased Plan",
      // influencerSelection: 30,
      // influencerProfileAnalysis: 30,
      // monitorPosts: 3,
      // campaignUsage: 0,
    },
    { merge: true }
  );

  const userRef = doc(db, "users", userId);
  await setDoc(
    userRef,
    {
      influencerSelection: 30,
      influencerProfileAnalysis: 30,
      monitorPosts: 3,
      campaignUsage: 3,
      duration: plan?.duration,
      purchaseDate,
      expiryDate,
      trialVersion: false,
    },
    { merge: true }
  );
  return userId;
};

const updatePaymentStatus = async (sessionId) => {
  const ref = doc(db, "payments", sessionId);
  await setDoc(ref, { status: "paid" }, { merge: true });
  return sessionId;
};

const getUserPayments = async (userId) => {
  const ref = collection(db, "payments");
  const q = query(ref, where("userId", "==", userId));
  const res = await getDocs(q);
  const data = [];
  res.docs.forEach((e) => {
    data?.push({
      ...e.data(),
      id: e?.id,
      expiryDate: e?.data()?.expiryDate?.toDate(),
      purchaseDate: e?.data()?.purchaseDate?.toDate(),
    });
  });
  return data;
};

const paymentApi = {
  addPayment,
  updatePaymentStatus,
  getUserPayments,
};

export default paymentApi;
