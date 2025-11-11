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
    <div className="mx-auto max-w-4xl p-4 py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-96 w-full object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-4xl font-bold text-blue-600">
            {product.price} kr
          </p>
          <p className="mt-4 text-base text-gray-700">{product.description}</p>

          {isOwner && (
            <Link
              to={`/edit-product/${product._id}`}
              className="mt-6 inline-block rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Edit your listing
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
