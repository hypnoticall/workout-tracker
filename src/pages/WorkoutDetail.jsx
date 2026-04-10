import { createSignal, onMount, For, Show } from "solid-js"
import { useNavigate, useParams } from "@solidjs/router"
import { getWorkout, deleteWorkout } from "../lib/db"

export default function WorkoutDetail(props) {
  const navigate = useNavigate()
  const params = useParams()
  const [workout, setWorkout] = createSignal(null)
  const [loading, setLoading] = createSignal(true)

  onMount(async () => {
    const data = await getWorkout(params.id)
    setWorkout(data)
    setLoading(false)
  })

  const handleDelete = async () => {
    if (!confirm("Jesi li siguran da želiš obrisati ovaj trening?")) return
    await deleteWorkout(params.id)
    navigate("/")
  }

  return (
    <div class="min-h-screen bg-base-200 p-6">
      <div class="max-w-lg mx-auto">
        <button class="btn btn-ghost btn-sm mb-4" onClick={() => navigate("/")}>← Natrag</button>

        <Show
          when={!loading()}
          fallback={
            <div class="flex justify-center">
              <span class="loading loading-spinner"></span>
            </div>
          }
        >
          <Show
            when={workout()}
            fallback={
              <div class="card bg-base-100 shadow p-8 text-center">
                Trening nije pronađen.
              </div>
            }
          >
            <div class="flex justify-between items-start mb-6">
              <div>
                <h1 class="text-2xl font-bold">{workout().title}</h1>
                <p class="text-sm text-base-content/60 mt-1">
                  📅 {workout().date} &nbsp;·&nbsp; ⏱ {workout().durationMinutes} min
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  class="btn btn-outline btn-sm"
                  onClick={() => navigate(`/workout/${params.id}/edit`)}
                >✏️ Uredi</button>
                <button
                  class="btn btn-error btn-outline btn-sm"
                  onClick={handleDelete}
                >🗑 Obriši</button>
              </div>
            </div>

            <div class="card bg-base-100 shadow mb-4">
              <div class="card-body p-4">
                <h2 class="font-semibold mb-3">Vježbe</h2>
                <For each={workout().exercises}>
                  {(ex) => (
                    <div class="mb-4 last:mb-0">
                      <p class="font-medium text-sm mb-2">{ex.name}</p>
                      <div class="grid grid-cols-3 gap-1 mb-1 px-1">
                        <span class="text-xs text-base-content/40">Set</span>
                        <span class="text-xs text-base-content/40">Ponavljanja</span>
                        <span class="text-xs text-base-content/40">Kg</span>
                      </div>
                      <For each={ex.sets}>
                        {(set, i) => (
                          <div class="grid grid-cols-3 gap-1 py-1 border-b border-base-200 last:border-0">
                            <span class="text-sm text-base-content/50">{i() + 1}</span>
                            <span class="text-sm">{set.reps}</span>
                            <span class="text-sm">{set.weightKg ? `${set.weightKg} kg` : "—"}</span>
                          </div>
                        )}
                      </For>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <Show when={workout().notes}>
              <div class="card bg-base-100 shadow">
                <div class="card-body p-4">
                  <h2 class="font-semibold mb-2">Bilješka</h2>
                  <p class="text-sm text-base-content/70">{workout().notes}</p>
                </div>
              </div>
            </Show>
          </Show>
        </Show>
      </div>
    </div>
  )
}