import Product from "../models/productModel.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      message: "Serverfel vid hämtning av produkter",
      error: error.message,
    })
  }
}
