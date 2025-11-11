
export const registerUser = (req, res) => {
  try {
    // 1. Get data from request body
    const { name, email, password } = req.body

    // 2. Validation (simple)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Alla fält (namn, e-post, lösenord) måste fyllas i." })
    }

    // 3. TODO:
    //    - Chech if user already exists
    //    - Hash the password
    //    - Save the user to the database

    // 4. For now: Log the data on the server and send a success response
    console.log("New user to register:", req.body)

    res.status(201).json({
      message: "User registered!",
      user: { name: name, email: email },
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during registration", error: error.message })
  }
}

// Function to log in a user
// (We will build this later)
export const loginUser = (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." })
    }

    // TODO:
    //    - Find the user in the database
    //    - Compare the hashed password
    //    - Create a JWT token and send it back

    console.log("Trying to log in:", req.body)

    res.status(200).json({
      message: "Login successful (for now)!",
      // Do not send back the password!
      user: { email: email },
      token: "here-comes-a-jwt-token-later",
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message })
  }
}
