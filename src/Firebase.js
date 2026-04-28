// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyD2QYUmMKEeldxmvr-fmSG71tFYYFG4x7Q",
  authDomain: "leetcode-clone-d8543.firebaseapp.com",
  projectId: "leetcode-clone-d8543",
  storageBucket: "leetcode-clone-d8543.firebasestorage.app",
  messagingSenderId: "792180584874",
  appId: "1:792180584874:web:61adbeac5151bdf5b93bd3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

