import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Namn måste anges"],
    },
    email: {
      type: String,
      required: [true, "E-post måste anges"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Lösenord måste anges"],
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
export default User
