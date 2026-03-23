export const workoutSchema = (userId, data) => ({
  userId,
  title: data.title,
  date: data.date,
  durationMinutes: Number(data.durationMinutes),
  notes: data.notes || "",
  createdAt: new Date().toISOString()
})

export const exerciseSchema = (data, order) => ({
  name: data.name,
  sets: Number(data.sets),
  reps: Number(data.reps),
  weightKg: data.weightKg ? Number(data.weightKg) : null,
  order
})