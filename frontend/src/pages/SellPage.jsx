import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext.jsx"

function SellPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const productData = {
      name: name,
      description,
      price,
      imageUrl,
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(
        "http://localhost:3000/api/products",
        productData,
        config
      )

      navigate("/")
    } catch (error) {
      throw new Error("Could not create product:", error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Create a New Product
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product Title
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
              placeholder="e.g. Modern Outdoor Sofa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
              placeholder="Tell us about your product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Price (in SEK)
            </label>
            <input
              type="number"
              id="price"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
              placeholder="e.g. 4999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="imageUrl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
              placeholder="https://... (link to an image)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-green-500 px-6 py-3 text-lg font-bold text-white shadow-md transition-all hover:bg-green-600"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SellPage
