"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDdEemyoNmuIvt5sR4yiFt6Ntl4e5-dgh4",
  authDomain: "nexthire-c298a.firebaseapp.com",
  databaseURL: "https://nexthire-c298a-default-rtdb.firebaseio.com",
  projectId: "nexthire-c298a",
  storageBucket: "nexthire-c298a.firebasestorage.app",
  messagingSenderId: "715549071521",
  appId: "1:715549071521:web:bd7a2446baddb8919db8e0",
  measurementId: "G-2GWRS4F6B3"
};

// Initialize Firebase
// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ EXPORT auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);