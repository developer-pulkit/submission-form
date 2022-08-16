import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCqtCHZeoOnt9YO8oP2leclXd_VfGCucPg",
  authDomain: "submission-form-cbf68.firebaseapp.com",
  projectId: "submission-form-cbf68",
  storageBucket: "submission-form-cbf68.appspot.com",
  messagingSenderId: "81625844232",
  appId: "1:81625844232:web:bb75e92576e1a4921a1fbd",
  measurementId: "G-5LGDXBJM30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
