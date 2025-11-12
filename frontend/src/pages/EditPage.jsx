import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext.jsx"

function EditPage() {
  const { id: productId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${productId}`
        )

        const { name, description, price, imageUrl } = response.data
        setName(name)
        setDescription(description)
        setPrice(price)
        setImageUrl(imageUrl)
        setLoading(false)
      } catch (error) {
        navigate("/")
        throw new Error("Could not fetch the product:", error)
      }
    }

    fetchProduct()
  }, [productId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedData = { name, description, price, imageUrl }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.put(
        `http://localhost:3000/api/products/${productId}`,
        updatedData,
        config
      )
      navigate(`/`)
    } catch (error) {
      throw new Error("Could not update the product:", error)
    }
  }

  if (loading) {
    return <div className="p-8 text-center"> Loading...</div>
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0 opacity-15">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-900 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-900 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl shadow-blue-500/10">
        <div className="rounded-xl bg-gray-950 p-8">
          <h1 className="mb-6 text-center text-3xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Edit Your Item
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
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-md shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPage
