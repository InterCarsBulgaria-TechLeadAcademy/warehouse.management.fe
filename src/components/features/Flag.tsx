import { Link } from 'react-router-dom'
import bulgarian_flag from '../../assets/bulgaria-flag-icon.png'
import { Box } from '@mui/material'

export default function Flag() {
  return (
    <Box component={Link} to="#">
      <Box
        component="img"
        src={bulgarian_flag}
        alt="bulgarian_flag"
        sx={{
          width: '35px',
          height: 'auto',
          marginRight: '1.5em'
        }}
      />
    </Box>
  )
}
