import { useState, useEffect } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products")

        setProducts(response.data)
      } catch (error) {
        throw new Error("Could not fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    // Call the function
    fetchProducts()
  }, []) // The empty array [] means "run this only once"
  if (loading) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Loading products...</h1>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-900 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-900 blur-3xl"></div>
        </div>
        <div className="relative z-10 p-4">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome to MarketPlace
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 md:text-xl">
            This was built with MERN stack and Docker. And for me to learn react
            and tailwind.
          </p>

          <Link
            to="/sell"
            className="mt-10 inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 text-xl font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/40"
          >
            Start Selling Now
          </Link>
        </div>

        {/* Valfri: Skrolla-ner-indikator */}
        <div className="absolute bottom-10 z-10 animate-bounce text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      <div className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Latest Listings
          </h2>

          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
