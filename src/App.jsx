import { createSignal, onMount, Show } from "solid-js"
import { Router, Route } from "@solidjs/router"
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
    <Router root={Layout}>
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/signout" component={SignOut} />
      <Route
        path="/profile"
        component={() => user()
          ? <UserProfile user={user()} />
          : <>{window.location.href = "/login"}</>}
      />
      <Route
        path="/"
        component={() => user()
          ? <Dashboard user={user()} />
          : <>{window.location.href = "/login"}</>}
      />
    </Router>
  )
}

function Layout(props) {
  onMount(() => {
    console.log("Layout mounted");
  })

  return (
    <div class="min-h-screen flex flex-col">
      <header class="bg-base-100 shadow">
        <div class="container mx-auto px-4 py-2">
          <h1 class="text-2xl font-bold">Workout Tracker</h1>
        </div>
      </header>
      <main class="grow container mx-auto px-4 py-2">
        {props.children}
      </main>
      <footer class="bg-base-100 shadow">
        <div class="container mx-auto px-4 py-2">
          <p class="text-sm text-center">© 2023 Workout Tracker</p>
        </div>
      </footer>
    </div>
  )
}