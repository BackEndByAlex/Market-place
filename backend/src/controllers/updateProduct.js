import Product from "../models/productModel.js"

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    console.log("Backend-jämförelse:")
    console.log("Produktens ägare:", product.user.toString())
    console.log("Inloggad användare:", req.user._id.toString())

    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this product." })
    }

    product.name = req.body.name || product.name
    product.description = req.body.description || product.description
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image

    const updatedProduct = await product.save()

    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: "Server error." })
  }
}
