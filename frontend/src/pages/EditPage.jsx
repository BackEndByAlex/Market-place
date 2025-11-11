import { useParams } from "react-router-dom"

function EditPage() {
  const { id } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <p className="mt-4 text-gray-700">Editing product with ID: {id}</p>
      {/* Additional form fields and logic for editing the product would go here */}
    </div>
  )
}

export default EditPage
