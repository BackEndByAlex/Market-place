import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext.jsx"

function ProductDetailPage() {
  const { id: productId } = useParams()
  const { user } = useAuth()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${productId}`
        )
        setProduct(response.data)
        setLoading(false)
      } catch (error) {
        throw new Error("Could not fetch the product:", error)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Loading product...</h1>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    )
  }

  const isOwner = user && user._id === product.user

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="overflow-hidden rounded-lg border border-blue-500/30 bg-gray-950 shadow-xl shadow-blue-500/20 md:grid md:grid-cols-2">
        <div className="md:border-r md:border-gray-800">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-80 w-full object-cover md:h-full"
          />
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <div>
            <h1 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {product.name}
              </span>
            </h1>

            <p className="mt-2 text-5xl font-extrabold text-blue-400">
              {product.price} <span className="text-3xl">Credits</span>
            </p>

            <p className="mt-6 text-base text-gray-300">
              {product.description}
            </p>
          </div>

          <div className="flex-grow"></div>

          {isOwner && (
            <div className="mt-8">
              <Link
                to={`/edit/${product._id}`}
                className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                Edit Your Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
