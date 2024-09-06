import { getWarehouseManagementApi } from '@/services/generated-api'
import { UserDto } from '@/services/model'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface AuthContextProps {
  user: UserDto | null
  setUser: (user: UserDto | null) => void
}

const initialAuthContext: AuthContextProps = {
  user: null,
  setUser: () => {}
}

export const AuthContext = createContext<AuthContextProps>(initialAuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<UserDto | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getWarehouseManagementApi().getApiUserMe()

        if (response.userName) {
          setUserState(response)
        } else {
          console.error('Invalid user data received:', response)
        }
      } catch (error) {
        console.error('Error fetching user on initial load:', error)
        return
      }
    }

    fetchUser()
  }, [])

  const setUser = (user: UserDto | null) => {
    setUserState(user)
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
