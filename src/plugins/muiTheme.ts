import { PaletteColor, createTheme } from '@mui/material/styles'

export interface ExtendedTheme extends PaletteColor {
  palette: {
    mode?: string
    primary: {
      main: string
      900: string
      800: string
      700: string
      600: string
      500: string
      400: string
      300: string
      200: string
      100: string
    }
    secondary: {
      main: string
      900: string
      800: string
      700: string
      600: string
      500: string
      400: string
      300: string
      200: string
      100: string
    }
  }
}

export const light = createTheme({
  palette: {
    primary: {
      main: '#BB0021',
      900: '#BB0021',
      800: '#C9022D',
      700: '#D61135',
      600: '#E8203B',
      500: '#F72C3C',
      400: '#F14555',
      300: '#E66C77',
      200: '#EF969D',
      100: '#FFCBD4'
    },
    secondary: {
      main: '#2A3040',
      900: '#2A3040',
      800: '#3D4458',
      700: '#4E576E',
      600: '#5F6A85',
      500: '#6D7896',
      400: '#838CA7',
      300: '#98A0B9',
      200: '#B5BBCF',
      100: '#D0D7E6'
    }
  }
})

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB0021',
      900: '#BB0021',
      800: '#C9022D',
      700: '#D61135',
      600: '#E8203B',
      500: '#F72C3C',
      400: '#F14555',
      300: '#E66C77',
      200: '#EF969D',
      100: '#FFCBD4'
    },
    secondary: {
      main: '#2A3040',
      900: '#2A3040',
      800: '#3D4458',
      700: '#4E576E',
      600: '#5F6A85',
      500: '#6D7896',
      400: '#838CA7',
      300: '#98A0B9',
      200: '#B5BBCF',
      100: '#D0D7E6'
    },
    background: {
      default: 'black'
    },
    text: {
      primary: '#fff' // White text
    }
  }
})
