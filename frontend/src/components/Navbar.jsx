// src/components/Navbar.jsx
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { token, logout } = useAuth()

  return (
    <nav className="w-full bg-white p-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MarketPlace
        </Link>

        <div className="flex space-x-4">
          {token ? (
            <>
              <Link
                to="/sell"
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Sell
              </Link>
              <button
                onClick={logout}
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-500">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
