import { onMount } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { logout } from "../lib/auth"

export default function SignOut() {
  const navigate = useNavigate()

  onMount(async () => {
    await logout()
    navigate("/login")
  })

  return <div class="flex items-center justify-center h-screen">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
}