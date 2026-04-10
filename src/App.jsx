import { createSignal, onMount, Show } from "solid-js"
import { Router, Route } from "@solidjs/router"
import { onAuthChange } from "./lib/auth"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import SignOut from "./pages/SignOut"
import ResetPassword from "./pages/ResetPassword"
import UserProfile from "./pages/UserProfile"
import Dashboard from "./pages/Dashboard"
import NewWorkout from "./pages/NewWorkout"
import WorkoutDetail from "./pages/WorkoutDetail"
import EditWorkout from "./pages/EditWorkout"

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
    <Show
      when={!loading()}
      fallback={
        <div class="flex items-center justify-center h-screen">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <Router>
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/signout" component={SignOut} />
        <Route path="/profile" component={() => user() ? <UserProfile user={user()} /> : <SignIn />} />
        <Route path="/new" component={() => user() ? <NewWorkout user={user()} /> : <SignIn />} />
        <Route path="/workout/:id" component={() => user() ? <WorkoutDetail user={user()} /> : <SignIn />} />
        <Route path="/workout/:id/edit" component={() => user() ? <EditWorkout user={user()} /> : <SignIn />} />
        <Route path="/" component={() => user() ? <Dashboard user={user()} /> : <SignIn />} />
      </Router>
    </Show>
  )
}