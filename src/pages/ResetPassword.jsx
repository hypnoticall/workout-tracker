import { createSignal } from "solid-js"
import { A } from "@solidjs/router"
import { resetPassword } from "../lib/auth"

export default function ResetPassword() {
  const [email, setEmail] = createSignal("")
  const [sent, setSent] = createSignal(false)
  const [error, setError] = createSignal("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await resetPassword(email())
      setSent(true)
    } catch (err) {
      setError("Email nije pronađen.")
    }
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-base-200">
      <div class="card w-full max-w-sm bg-base-100 shadow-md p-8">
        <h1 class="text-2xl font-bold mb-6">Oporavak lozinke</h1>
        {sent() ? (
          <div class="flex flex-col gap-4">
            <p class="text-success">Email je poslan! Provjeri inbox.</p>
            <A href="/login" class="btn btn-outline">Natrag na prijavu</A>
          </div>
        ) : (
          <form onSubmit={handleSubmit} class="flex flex-col gap-4">
            <input class="input input-bordered" type="email" placeholder="Tvoj email"
              value={email()} onInput={e => setEmail(e.target.value)} required />
            {error() && <p class="text-error text-sm">{error()}</p>}
            <button class="btn btn-primary" type="submit">Pošalji reset link</button>
            <A href="/login" class="btn btn-outline">Natrag</A>
          </form>
        )}
      </div>
    </div>
  )
}