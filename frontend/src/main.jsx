import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import { AuthProvider } from "./context/AuthContext"

import ProtectedRoute from "./components/ProtectedRoute.jsx"

import Layout from "./Layout"
import HomePage from "./pages/HomePage"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SellPage from "./pages/SellPage"
import EditPage from "./pages/EditPage"
import ProductDetailPage from "./pages/ProductDetailPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "sell",
        element: <SellPage />,
      },
      {
        path: "edit-product/:id",
        element: <EditPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
