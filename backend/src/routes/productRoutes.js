import express from "express"
import { createProduct } from "../controllers/productController.js"
import { getProducts } from "../controllers/getProducts.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/products", getProducts)
router.post("/products", protect, createProduct)

export default router
