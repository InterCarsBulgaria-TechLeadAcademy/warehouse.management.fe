import * as React from 'react'
import { AuthContext } from '@/contexts/Auth'

export const useAuth = () => {
  return React.useContext(AuthContext)
}
