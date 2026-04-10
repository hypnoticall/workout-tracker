import {
  doc, setDoc, getDoc, updateDoc, serverTimestamp,
  collection, addDoc, getDocs, deleteDoc, query, where, orderBy
} from "firebase/firestore"
import { db } from "./firebase"

// ── USER ──────────────────────────────────────────
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

// ── WORKOUTS ───────────────────────────────────────
export const addWorkout = async (userId, workoutData, exercises) => {
  const workoutRef = await addDoc(collection(db, "workouts"), {
    userId,
    title: workoutData.title,
    date: workoutData.date,
    durationMinutes: Number(workoutData.durationMinutes),
    notes: workoutData.notes || "",
    createdAt: serverTimestamp()
  })

  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i]
    await addDoc(collection(db, "workouts", workoutRef.id, "exercises"), {
      name: ex.name,
      sets: ex.sets.map(s => ({
        reps: Number(s.reps) || 0,
        weightKg: s.weightKg ? Number(s.weightKg) : null
      })),
      order: i
    })
  }

  return workoutRef.id
}

export const getWorkouts = async (userId) => {
  const q = query(
    collection(db, "workouts"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getWorkout = async (workoutId) => {
  const ref = doc(db, "workouts", workoutId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null

  const exercisesSnap = await getDocs(
    query(collection(db, "workouts", workoutId, "exercises"), orderBy("order"))
  )
  const exercises = exercisesSnap.docs.map(d => ({ id: d.id, ...d.data() }))

  return { id: snap.id, ...snap.data(), exercises }
}

export const updateWorkout = async (workoutId, workoutData, exercises) => {
  const ref = doc(db, "workouts", workoutId)
  await updateDoc(ref, {
    title: workoutData.title,
    date: workoutData.date,
    durationMinutes: Number(workoutData.durationMinutes),
    notes: workoutData.notes || ""
  })

  const oldExercises = await getDocs(collection(db, "workouts", workoutId, "exercises"))
  for (const ex of oldExercises.docs) {
    await deleteDoc(ex.ref)
  }

  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i]
    await addDoc(collection(db, "workouts", workoutId, "exercises"), {
      name: ex.name,
      sets: ex.sets.map(s => ({
        reps: Number(s.reps) || 0,
        weightKg: s.weightKg ? Number(s.weightKg) : null
      })),
      order: i
    })
  }
}

export const deleteWorkout = async (workoutId) => {
  const exercises = await getDocs(collection(db, "workouts", workoutId, "exercises"))
  for (const ex of exercises.docs) {
    await deleteDoc(ex.ref)
  }
  await deleteDoc(doc(db, "workouts", workoutId))
}