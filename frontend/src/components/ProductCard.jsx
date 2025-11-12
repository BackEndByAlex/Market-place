import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

function ProductCard({ product }) {
  const { user, token } = useAuth()
  const navigate = useNavigate()

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

      window.location.reload()
    } catch (error) {
      throw new Error("Could not delete the product:", error)
    }
  }

  const handleEdit = () => {
    navigate(`/edit-product/${product._id}`)
  }

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-lg bg-gray-800 shadow-lg shadow-blue-500/10 transition-all duration-300 hover:!scale-105 hover:shadow-xl hover:shadow-blue-500/20 border border-blue-500/10">
      <div>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-56 w-full object-cover"
          />
          <div className="p-4">
            {/* Ljusare text för titeln */}
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            {/* Ljusare, accentuerad färg för priset */}
            <p className="mt-2 text-2xl font-bold text-blue-400">
              {product.price} kr
            </p>
          </div>
        </Link>
      </div>

      {/* Knappar */}
      {isOwner && (
        <div className="flex space-x-2 p-4 pt-0">
          <button
            onClick={handleEdit}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductCard
