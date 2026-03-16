import { createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { updateProfile } from "firebase/auth"
import { updateUserDoc } from "../lib/db"
import { auth } from "../lib/firebase"

export default function UserProfile(props) {
  const [name, setName] = createSignal(props.user.displayName || "")
  const [saved, setSaved] = createSignal(false)
  const [error, setError] = createSignal("")
  const navigate = useNavigate()

  const handleSave = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await updateProfile(auth.currentUser, { displayName: name() })
      await updateUserDoc(props.user.uid, { displayName: name() })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError("Greška pri spremanju.")
    }
  }

  return (
    <div class="min-h-screen bg-base-200 p-6">
      <div class="max-w-sm mx-auto">
        <button class="btn btn-ghost btn-sm mb-4" onClick={() => navigate("/")}>← Natrag</button>
        <div class="card bg-base-100 shadow-md p-8">
          <h1 class="text-2xl font-bold mb-6">Moj profil</h1>
          <form onSubmit={handleSave} class="flex flex-col gap-4">
            <div>
              <label class="label text-sm">Ime i prezime</label>
              <input class="input input-bordered w-full" type="text"
                value={name()} onInput={e => setName(e.target.value)} required />
            </div>
            <div>
              <label class="label text-sm">Email</label>
              <input class="input input-bordered w-full" type="email"
                value={props.user.email} disabled />
            </div>
            {error() && <p class="text-error text-sm">{error()}</p>}
            {saved() && <p class="text-success text-sm">Profil spremljen!</p>}
            <button class="btn btn-primary" type="submit">Spremi</button>
          </form>
          <div class="divider"></div>
          <button class="btn btn-outline btn-error w-full" onClick={() => navigate("/signout")}>
            Odjava
          </button>
        </div>
      </div>
    </div>
  )
}