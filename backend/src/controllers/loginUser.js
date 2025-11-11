import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Validering
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "E-post och lösenord måste fyllas i." })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(401)
        .json({ message: "Felaktig e-post eller lösenord." })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Felaktig e-post eller lösenord." })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    res.status(200).json({
      message: "Inloggning lyckad!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Serverfel vid inloggning", error: error.message })
  }
}
