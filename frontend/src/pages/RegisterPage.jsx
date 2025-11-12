import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name,
      email,
      password,
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData
      )
    } catch (error) {
      throw new Error("Could not register user:", error)
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-lg border border-blue-500/30 bg-gray-950 p-8 shadow-xl shadow-blue-500/20">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create Your Account
          </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-400"
            >
              Namn
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-200 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ditt Namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-200 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-200 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-md shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-950"
            >
              Register
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
            >
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
