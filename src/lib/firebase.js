import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "TVOJ_API_KEY",
  authDomain: "TVOJ_AUTH_DOMAIN",
  projectId: "TVOJ_PROJECT_ID",
  storageBucket: "TVOJ_STORAGE_BUCKET",
  messagingSenderId: "TVOJ_SENDER_ID",
  appId: "TVOJ_APP_ID"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)