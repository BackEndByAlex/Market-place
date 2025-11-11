import axios from "axios"
import { useAuth } from "../context/AuthContext"

function ProductCard({ product }) {
  const { user, token } = useAuth()

  const isOwner = user && user._id === product.user

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.delete(
        `http://localhost:3000/api/products/${product._id}`,
        config
      )

      alert("Product deleted!")

      window.location.reload()
    } catch (error) {
      console.error("Could not delete the product:", error)
      alert(
        `Error: ${error.response?.data?.message || "Something went wrong."}`
      )
    }
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-56 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-2 text-2xl font-bold text-blue-600">
          {product.price} kr
        </p>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="mt-4 w-full rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Delete the listing
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
