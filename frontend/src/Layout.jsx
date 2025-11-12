import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 ">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
