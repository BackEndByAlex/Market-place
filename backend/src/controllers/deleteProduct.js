import Product from "../models/productModel.js"

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this product." })
    }

    await Product.deleteOne({ _id: productId })

    res.status(200).json({ message: "Product deleted successfully." })
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting product",
      error: error.message,
    })
  }
}
