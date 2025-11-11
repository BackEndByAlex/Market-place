import express from "express"
import authRoutes from "./authRoutes.js"
import productRoutes from "./productRoutes.js"

const router = express.Router()

router.use("/api", authRoutes)
router.use("/api", productRoutes)

export default router
