import React, { createContext, useState, ReactNode } from 'react'

interface AuthContextProps {
  isAuth: boolean
  setIsAuth: (value: boolean) => void
  token: string
  setToken: (value: string) => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => {},
  token: '',
  setToken: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
