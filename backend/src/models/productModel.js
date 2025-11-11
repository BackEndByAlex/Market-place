import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The product name is required"],
    },
    description: {
      type: String,
      required: [true, "The product description is required"],
    },
    price: {
      type: Number,
      required: [true, "The product price is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "The product image URL is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)
export default Product
