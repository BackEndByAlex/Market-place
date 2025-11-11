import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext.jsx"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      email,
      password,
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData
      )

      const { token, user } = response.data

      auth.login(token, user)
      navigate("/")
    } catch (error) {
      throw new Error("Could not log in:", error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center">Logga in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-semibold" htmlFor="email">
              E-post
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="exemple@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-semibold" htmlFor="password">
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="ange ditt lösenord"
              autoComplete=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Logga in
          </button>

          <p className="mt-4 text-center text-gray-600">
            Har du inget konto?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Registrera här
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
