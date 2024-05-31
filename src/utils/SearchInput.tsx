import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';

export const Search = () => {
  return (
    <Box component='div' sx={{
      position: 'relative',
      borderRadius: '0.2em',
      backgroundColor: '#e6e6e6',
      '&:hover': {
        backgroundColor: '#ffffff40' // Прозрачен бял цвят
      },
      marginRight: '16px', // theme.spacing(2) е приблизително 16px
      marginLeft: 0,
      width: '100%',
      '@media (min-width:600px)': { // theme.breakpoints.up('sm')
        marginLeft: '24px', // theme.spacing(3) е приблизително 24px
        width: 'auto'
      }
    }}>
    </Box>
  )
}

export const SearchIconWrapper = () => {
  return (
    <Box component='div' sx={{
      padding: '0 16px', // theme.spacing(0, 2)
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}></Box>
  )
}

export const StyledInputBase = () => {
  return (
    <Box sx={{
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: '8px 8px 8px 0', // theme.spacing(1, 1, 1, 0)
        paddingLeft: `calc(1em + 32px)`, // theme.spacing(4) е приблизително 32px
        transition: 'width 0.2s', // theme.transitions.create('width')
        width: '100%',
        '@media (min-width:960px)': { // theme.breakpoints.up('md')
          width: '20ch'
        }
      }
    }}>
      <InputBase />
    </Box>
  )
}


