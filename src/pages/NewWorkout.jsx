import { createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { addWorkout } from "../lib/db"

const emptyExercise = () => ({
  name: "",
  sets: [{ reps: "", weightKg: "" }]
})

export default function NewWorkout(props) {
  const navigate = useNavigate()
  const [title, setTitle] = createSignal("")
  const [date, setDate] = createSignal(new Date().toISOString().split("T")[0])
  const [duration, setDuration] = createSignal("")
  const [notes, setNotes] = createSignal("")
  const [exercises, setExercises] = createSignal([emptyExercise()])
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal("")

  const updateExerciseName = (i, value) => {
    setExercises(prev => {
      const updated = [...prev]
      updated[i] = { ...updated[i], name: value }
      return updated
    })
  }

  const updateSet = (exIdx, setIdx, field, value) => {
    setExercises(prev => {
      const updated = [...prev]
      const sets = [...updated[exIdx].sets]
      sets[setIdx] = { ...sets[setIdx], [field]: value }
      updated[exIdx] = { ...updated[exIdx], sets }
      return updated
    })
  }

  const addSet = (exIdx) => {
    setExercises(prev => {
      const updated = [...prev]
      updated[exIdx] = {
        ...updated[exIdx],
        sets: [...updated[exIdx].sets, { reps: "", weightKg: "" }]
      }
      return updated
    })
  }

  const removeSet = (exIdx, setIdx) => {
    setExercises(prev => {
      const updated = [...prev]
      updated[exIdx] = {
        ...updated[exIdx],
        sets: updated[exIdx].sets.filter((_, i) => i !== setIdx)
      }
      return updated
    })
  }

  const addExercise = () => setExercises(prev => [...prev, emptyExercise()])

  const removeExercise = (i) => {
    setExercises(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await addWorkout(
        props.user.uid,
        { title: title(), date: date(), durationMinutes: duration(), notes: notes() },
        exercises().filter(ex => ex.name.trim() !== "")
      )
      navigate("/")
    } catch (err) {
      setError("Greška pri spremanju. Pokušaj ponovo.")
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div class="min-h-screen bg-base-200 p-6">
      <div class="max-w-lg mx-auto">
        <button class="btn btn-ghost btn-sm mb-4" onClick={() => navigate("/")}>← Natrag</button>
        <h1 class="text-2xl font-bold mb-6">Novi trening</h1>

        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <div class="card bg-base-100 shadow p-6 flex flex-col gap-4">
            <div>
              <label class="label text-sm">Naziv treninga</label>
              <input
                class="input input-bordered w-full"
                type="text"
                placeholder="npr. Push – Prsa & Triceps"
                value={title()}
                onInput={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label text-sm">Datum</label>
                <input
                  class="input input-bordered w-full"
                  type="date"
                  value={date()}
                  onInput={e => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label class="label text-sm">Trajanje (min)</label>
                <input
                  class="input input-bordered w-full"
                  type="number"
                  placeholder="60"
                  value={duration()}
                  onInput={e => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label class="label text-sm">Bilješka</label>
              <textarea
                class="textarea textarea-bordered w-full"
                placeholder="Kako si se osjećao..."
                onInput={e => setNotes(e.target.value)}
              >{notes()}</textarea>
            </div>
          </div>

          <div class="card bg-base-100 shadow p-6">
            <h2 class="font-semibold mb-4">Vježbe</h2>
            <div class="flex flex-col gap-4">
              {exercises().map((ex, exIdx) => (
                <div class="bg-base-200 rounded-lg p-4">
                  <div class="flex gap-2 mb-3">
                    <input
                      class="input input-bordered input-sm flex-1"
                      type="text"
                      placeholder="Naziv vježbe"
                      value={ex.name}
                      onInput={e => updateExerciseName(exIdx, e.target.value)}
                    />
                    {exercises().length > 1 && (
                      <button
                        type="button"
                        class="btn btn-ghost btn-sm text-error"
                        onClick={() => removeExercise(exIdx)}
                      >✕</button>
                    )}
                  </div>

                  <div class="grid grid-cols-3 gap-1 mb-1 px-1">
                    <span class="text-xs text-base-content/50">Set</span>
                    <span class="text-xs text-base-content/50">Ponavljanja</span>
                    <span class="text-xs text-base-content/50">Kg</span>
                  </div>

                  {ex.sets.map((set, setIdx) => (
                    <div class="grid grid-cols-3 gap-2 mb-2 items-center">
                      <div class="flex items-center gap-1">
                        <span class="text-sm font-medium text-base-content/60 w-4">{setIdx + 1}</span>
                        {ex.sets.length > 1 && (
                          <button
                            type="button"
                            class="btn btn-ghost btn-xs text-error px-1"
                            onClick={() => removeSet(exIdx, setIdx)}
                          >✕</button>
                        )}
                      </div>
                      <input
                        class="input input-bordered input-sm"
                        type="number"
                        placeholder="8"
                        value={set.reps}
                        onInput={e => updateSet(exIdx, setIdx, "reps", e.target.value)}
                      />
                      <input
                        class="input input-bordered input-sm"
                        type="number"
                        placeholder="80"
                        value={set.weightKg}
                        onInput={e => updateSet(exIdx, setIdx, "weightKg", e.target.value)}
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    class="btn btn-ghost btn-xs w-full mt-1"
                    onClick={() => addSet(exIdx)}
                  >+ Dodaj set</button>
                </div>
              ))}
            </div>
            <button
              type="button"
              class="btn btn-outline btn-sm w-full mt-3"
              onClick={addExercise}
            >+ Dodaj vježbu</button>
          </div>

          {error() && <p class="text-error text-sm">{error()}</p>}
          <button class="btn btn-primary" type="submit" disabled={loading()}>
            {loading()
              ? <span class="loading loading-spinner loading-sm"></span>
              : "Spremi trening"}
          </button>
        </form>
      </div>
    </div>
  )
}