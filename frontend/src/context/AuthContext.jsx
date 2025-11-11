import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [ token, setToken ] = useState(null)
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const storeToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')

    if (storeToken && storedUser) {
      setToken(storeToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (newToken, newUser) => {
    localStorage.setItem('authToken', newToken)
    localStorage.setItem('authUser', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    setToken(null)
    setUser(null)
  }

  const value = {
    token,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}