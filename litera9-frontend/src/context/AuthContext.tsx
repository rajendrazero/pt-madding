import { createContext, useContext, useState, useEffect } from 'react'

type User = {
  id: string
  email: string
  role: 'user' | 'admin'
  [key: string]: any
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const res = await fetch('https://pt-madding-api-production.up.railway.app/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUser(data.user)
    } catch {
      logout()
    }
  }

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}