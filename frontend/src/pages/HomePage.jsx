import { useState, useEffect } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products")

        setProducts(response.data)
      } catch (error) {
        console.error("Kunde inte hämta produkter:", error)
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
        <h1 className="text-2xl font-bold">Laddar produkter...</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Senaste annonserna
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
