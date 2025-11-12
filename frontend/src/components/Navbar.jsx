import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Rocket } from "lucide-react"

function Navbar() {
  const { token, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/70 p-4 backdrop-blur-md border-b border-blue-500/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-400 transition-all hover:text-blue-300 hover:drop-shadow-[0_0_8px_theme(colors.blue.500)]"
        >
          <Rocket size={28} />
          MarketPlace
        </Link>

        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Link
                to="/sell"
                className="rounded-md px-4 py-2 text-sm font-medium text-green-400 transition-all duration-300 border border-green-400/50 hover:bg-green-400/10 hover:shadow-[0_0_15px_theme(colors.green.500)]"
              >
                Sell
              </Link>
              <button
                onClick={logout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-500/20 transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-md px-4 py-2 text-sm font-medium text-blue-400 transition-all duration-300 border border-blue-400/50 hover:bg-blue-400/10 hover:shadow-[0_0_15px_theme(colors.blue.500)]"
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
