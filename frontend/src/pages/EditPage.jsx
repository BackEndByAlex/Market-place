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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Redigera annons
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Produkttitel
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
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
              Beskrivning
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
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
              Pris (i SEK)
            </label>
            <input
              type="number"
              id="price"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
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
              Bild-URL
            </label>
            <input
              type="text"
              id="imageUrl"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white shadow-md transition-all hover:bg-blue-700"
            >
              Spara ändringar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPage
