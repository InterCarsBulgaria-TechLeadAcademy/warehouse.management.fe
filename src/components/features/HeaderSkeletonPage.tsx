import { HeaderSkeletonPageProps } from '@/interfaces/headerSkeletonPage'
import { Box, Button, Typography } from '@mui/material'

export default function HeaderSkeletonPage({
  header,
  description,
  buttonText,
  buttonClickHandler
}: HeaderSkeletonPageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Box component="div">
        <Typography variant="h4">{header}</Typography>

        <Typography>{description}</Typography>
      </Box>

      {buttonText && buttonClickHandler ? (
        <Button variant="contained" onClick={buttonClickHandler}>
          {buttonText}
        </Button>
      ) : null}
    </Box>
  )
}
