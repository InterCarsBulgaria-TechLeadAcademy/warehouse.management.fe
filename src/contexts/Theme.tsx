import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { dark, light } from '@/plugins/muiTheme'
import { ColorModeContextValue } from '@/interfaces/colorModeContextValue'

interface Children {
  children: React.ReactNode
}

export const ColorModeContext = React.createContext<ColorModeContextValue>({
  toggleColorMode: () => {}
})

export default function ToggleColorMode({ children }: Children) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = React.useMemo(() => (mode === 'light' ? light : dark), [mode])

  const value: ColorModeContextValue = {
    toggleColorMode: colorMode.toggleColorMode
  }

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
