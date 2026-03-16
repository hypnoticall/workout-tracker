import { createSignal, onMount } from "solid-js"
import { Route, Routes, Navigate } from "@solidjs/router"
import { onAuthChange } from "./lib/auth"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import SignOut from "./pages/SignOut"
import ResetPassword from "./pages/ResetPassword"
import UserProfile from "./pages/UserProfile"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const [user, setUser] = createSignal(null)
  const [loading, setLoading] = createSignal(true)

  onMount(() => {
    onAuthChange((u) => {
      setUser(u)
      setLoading(false)
    })
  })

  return (
    <>
      {loading() ? (
        <div class="flex items-center justify-center h-screen">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <Routes>
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={SignUp} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/signout" component={SignOut} />
          <Route
            path="/profile"
            component={() =>
              user() ? <UserProfile user={user()} /> : <Navigate href="/login" />
            }
          />
          <Route
            path="/"
            component={() =>
              user() ? <Dashboard user={user()} /> : <Navigate href="/login" />
            }
          />
        </Routes>
      )}
    </>
  )
}