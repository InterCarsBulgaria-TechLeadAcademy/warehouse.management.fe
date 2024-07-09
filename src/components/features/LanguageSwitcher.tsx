import bulgarian_flag from '../../assets/bulgaria-flag-icon.png'
import { Box } from '@mui/material'

export default function LanguageSwitcher() {
  return (
    <Box
      component="img"
      src={bulgarian_flag}
      alt="bulgarian_flag"
      sx={{
        width: '35px',
        height: 'auto',
        marginRight: '1.5em',
        boxShadow: '0px 0px 8px 0px #00000040'
      }}
    />
  )
}
