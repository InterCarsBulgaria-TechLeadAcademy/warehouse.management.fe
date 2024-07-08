import * as React from 'react'
import { ColorModeContext } from '@/contexts/Theme'
import { ColorModeContextValue } from '@/interfaces/ColorModeContextValue'

export const useThemeContext = (): ColorModeContextValue => {
  const context = React.useContext(ColorModeContext)

  return {
    toggleColorMode: context.toggleColorMode
  }
}
