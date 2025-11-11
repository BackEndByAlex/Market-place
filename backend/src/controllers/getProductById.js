import Product from "../models/productModel.js"

export const getProductById = async (req, res) => {
  try {
    const productId = await Product.findById(req.params.id)

    if (productId) {
      res.status(200).json(productId)
    } else {
      res.status(404).json({ message: "Product not found." })
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error while retrieving product",
      error: error.message,
    })
  }
}
