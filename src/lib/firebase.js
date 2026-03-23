import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD9C3zs6UK-Xs_-tx-vSpTM_5WxfXrNp48",
  authDomain: "workout-tracker-js.firebaseapp.com",
  projectId: "workout-tracker-js",
  storageBucket: "workout-tracker-js.firebasestorage.app",
  messagingSenderId: "807124039539",
  appId: "1:807124039539:web:2a9155e7de0475da1cf706"
};


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)