import { createSignal, onMount } from "solid-js"
import { useNavigate, A } from "@solidjs/router"
import { login } from "../lib/auth"

export default function SignIn() {
  console.log("Rendering SignIn component")

  const [email, setEmail] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [error, setError] = createSignal("")
  const navigate = useNavigate()

  onMount(() => {
    console.log("SignIn component mounted")
  })

  const handleSubmit = async (e) => {
    console.log("Submitting form");
    e.preventDefault()
    setError("")
    try {
      await login(email(), password())
      navigate("/")
    } catch (err) {
      setError("Pogrešan email ili lozinka.")
    }
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-base-200">
      <div class="card w-full max-w-sm bg-base-100 shadow-md p-8">
        <h1 class="text-2xl font-bold mb-6">Prijava</h1>
        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
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
            placeholder="Lozinka"
            value={password()}
            onInput={e => setPassword(e.target.value)}
            required
          />
          {error() && <p class="text-error text-sm">{error()}</p>}
          <button class="btn btn-primary" type="submit">Prijavi se</button>
        </form>
        <div class="mt-4 text-sm text-center flex flex-col gap-2">
          <A href="/reset-password" class="link">Zaboravili ste lozinku?</A>
          <A href="/register" class="link">Nemate račun? Registrirajte se</A>
        </div>
      </div>
    </div>
  )

    return(<div>Test</div>)
}