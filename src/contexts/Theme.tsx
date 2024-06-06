import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { dark, light } from '@/plugins/muiTheme'

interface Children {
  children: React.ReactNode
}

interface ColorModeContextValue {
  mode: 'light' | 'dark'
  toggleColorMode: () => void
}

const ColorModeContext = React.createContext<ColorModeContextValue>({
  toggleColorMode: () => {},
  mode: 'light'
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
    mode,
    toggleColorMode: colorMode.toggleColorMode
  }

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useThemeContext = (): ColorModeContextValue => {
  const context = React.useContext(ColorModeContext)

  return {
    mode: context.mode,
    toggleColorMode: context.toggleColorMode
  }
}
