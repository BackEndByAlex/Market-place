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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0 opacity-15">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-900 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-900 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 p-1 shadow-2xl shadow-blue-500/10">
        <div className="rounded-xl bg-gray-950 p-8">
          <h1 className="mb-6 text-center text-3xl font-bold">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Create a New Announcement
            </span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-400"
              >
                Product Title
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-gray-200 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. Cyberdeck V-Wing"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-400"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-gray-200 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Describe your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-400"
              >
                Price (in Credits/SEK)
              </label>
              <input
                type="number"
                id="price"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-gray-200 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. 4999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-medium text-gray-400"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-gray-200 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://... (link to an image)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-green-500 to-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md shadow-green-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                Publish Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SellPage
