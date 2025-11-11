import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

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

      alert("Product deleted!")

      window.location.reload()
    } catch (error) {
      console.error("Could not delete the product:", error)
      alert(
        `Error: ${error.response?.data?.message || "Something went wrong."}`
      )
    }
  }

  const handleEdit = () => {
    navigate(`/edit-product/${product._id}`)
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
          <div className="mt-4 flex space-x-2">
            {" "}
            {/* En flex-container för knapparna */}
            <button
              onClick={handleEdit} // <-- Koppla funktionen
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Redigera
            </button>
            <button
              onClick={handleDelete}
              className="w-full rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
            >
              Ta bort
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
