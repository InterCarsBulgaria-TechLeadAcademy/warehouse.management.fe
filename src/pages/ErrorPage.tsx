import { Box, Button, Typography } from '@mui/material'
import error from '@/assets/error.svg'
import { useTranslation } from 'react-i18next'

//TODO: edit href link
export default function ErrorPage() {
  const { t: translate } = useTranslation()
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 1,
          gap: '2em',
          alignItems: 'center'
        }}>
        <Box
          component="img"
          src={error}
          alt="intercars-logo"
          sx={{
            display: 'block',
            width: '50%',
            height: 'auto'
          }}
        />
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          {translate('errorPage.description')}
        </Typography>

        <Button variant="contained" href="/defaultLayout">
          {translate('errorPage.labels.home')}
        </Button>
      </Box>
    </Box>
  )
}
