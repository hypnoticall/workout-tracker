import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export const createUserDoc = async (user) => {
  const ref = doc(db, "users", user.uid)
  await setDoc(ref, {
    displayName: user.displayName,
    email: user.email,
    role: "user",
    createdAt: serverTimestamp()
  })
}

export const getUserDoc = async (uid) => {
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export const updateUserDoc = async (uid, data) => {
  const ref = doc(db, "users", uid)
  await updateDoc(ref, data)
}