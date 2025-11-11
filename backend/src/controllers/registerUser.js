import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
  try {
    // 1. Get data from request body
    const { name, email, password } = req.body

    // 2. Validation (simple)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Alla fält (namn, e-post, lösenord) måste fyllas i." })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res
        .status(400)
        .json({ message: "En användare med denna e-post finns redan." })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (user) {
      res.status(201).json({
        message: "User register!",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    } else {
      res.status(400).json({ message: "Something went wrong" })
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    })
  }
}
