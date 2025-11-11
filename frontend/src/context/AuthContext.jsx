import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [ token, setToken ] = useState(null)

  useEffect(() => {
    const storeToken = localStorage.getItem('authToken')
    if (storeToken) {
      setToken(storeToken)
    }
  }, [])

  const login = (newToken) => {
    localStorage.setItem('authToken', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setToken(null)
  }

  const value = {
    token,
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