import { createSignal } from "solid-js"
import { useNavigate, A } from "@solidjs/router"
import { register } from "../lib/auth"

export default function SignUp() {
  const [name, setName] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [error, setError] = createSignal("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await register(email(), password(), name())
      navigate("/")
    } catch (err) {
      setError("Greška pri registraciji. Pokušajte ponovo.")
    }
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-base-200">
      <div class="card w-full max-w-sm bg-base-100 shadow-md p-8">
        <h1 class="text-2xl font-bold mb-6">Registracija</h1>
        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <input
            class="input input-bordered"
            type="text"
            placeholder="Ime i prezime"
            value={name()}
            onInput={e => setName(e.target.value)}
            required
          />
          <input
            class="input input-bordered"
            type="email"
            placeholder="Email"
            value={email()}
            onInput={e => setEmail(e.target.value)}
            required
          />
          <input
            class="input input-bordered"
            type="password"
            placeholder="Lozinka (min. 6 znakova)"
            value={password()}
            onInput={e => setPassword(e.target.value)}
            required
          />
          {error() && <p class="text-error text-sm">{error()}</p>}
          <button class="btn btn-primary" type="submit">Registriraj se</button>
        </form>
        <div class="mt-4 text-sm text-center">
          <A href="/login" class="link">Već imate račun? Prijavite se</A>
        </div>
      </div>
    </div>
  )
}