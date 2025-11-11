import Product from "../models/productModel.js"

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body

    if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({ message: "Alla fält måste fyllas i." })
    }

    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      user: req.user._id, // <-- Vi fick 'req.user' från vår middleware!
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({
      message: "Serverfel vid skapande av produkt",
      error: error.message,
    })
  }
}
