import { useNavigate } from "@solidjs/router"

export default function Dashboard(props) {
  const navigate = useNavigate()

  return (
    <div class="min-h-screen bg-base-200 p-6">
      <div class="max-w-lg mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">
            Zdravo, {props.user.displayName} 👋
          </h1>
          <button
            class="btn btn-ghost btn-sm"
            onClick={() => navigate("/profile")}
          >
            Profil
          </button>
        </div>
        <div class="card bg-base-100 shadow-md p-8 text-center text-base-content/50">
          Ovdje će biti lista treninga – Faza 3.
        </div>
      </div>
    </div>
  )
}