function ProductCard({ product }) {
  return (
    // Card container
    // We use Tailwind classes to style it
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      
      {/* Just now we don't link, but we could add:
        <a href={`/product/${product.id}`}> 
      */}

      {/* Image: We use 'imageUrl' from our product object */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-56 w-full object-cover" // Sets fixed height and ensures the image covers
      />

      {/* Content (Name and Price) */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="mt-2 text-2xl font-bold text-blue-600">
          {product.price} kr
        </p>
      </div>
      
      {/* </a> */}
    </div>
  )
}

export default ProductCard