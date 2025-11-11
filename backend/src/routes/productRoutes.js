import express from "express"
import { createProduct } from "../controllers/productController.js"
import { getProducts } from "../controllers/getProducts.js"
import { deleteProduct } from "../controllers/deleteProduct.js"
import { updateProduct } from "../controllers/updateProduct.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/products", getProducts)
router.post("/products", protect, createProduct)

router.delete("/products/:id", protect, deleteProduct)

router.put("/products/:id", protect, updateProduct)

export default router
