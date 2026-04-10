import { createResource, For, Show } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { getWorkouts } from "../lib/db"

export default function Dashboard(props) {
  const navigate = useNavigate()
  const [workouts, { refetch }] = createResource(() => getWorkouts(props.user.uid))

  return (
    <div class="min-h-screen bg-base-200 p-6">
      <div class="max-w-lg mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Zdravo, {props.user.displayName} 👋</h1>
          <button class="btn btn-ghost btn-sm" onClick={() => navigate("/profile")}>
            Profil
          </button>
        </div>

        <button class="btn btn-primary w-full mb-6" onClick={() => navigate("/new")}>
          + Novi trening
        </button>

        <Show
          when={!workouts.loading}
          fallback={
            <div class="flex justify-center">
              <span class="loading loading-spinner"></span>
            </div>
          }
        >
          <Show
            when={workouts()?.length > 0}
            fallback={
              <div class="card bg-base-100 shadow p-8 text-center text-base-content/50">
                Još nema treninga. Dodaj prvi!
              </div>
            }
          >
            <div class="flex flex-col gap-3">
              <For each={workouts()}>
                {(workout) => (
                  <div
                    class="card bg-base-100 shadow cursor-pointer hover:border-primary border border-transparent transition-colors"
                    onClick={() => navigate(`/workout/${workout.id}`)}
                  >
                    <div class="card-body p-4">
                      <div class="flex justify-between items-start">
                        <h2 class="font-semibold text-base">{workout.title}</h2>
                        <span class="text-xs text-base-content/50">{workout.date}</span>
                      </div>
                      <p class="text-sm text-base-content/60">⏱ {workout.durationMinutes} min</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </div>
    </div>
  )
}