import { Box, Button, Typography } from '@mui/material'

interface HeaderSkeletonPageProps {
  header: string
  description: string
  buttonText?: string
  buttonClickHandler?: React.MouseEventHandler<HTMLButtonElement>
}

export default function HeaderSkeletonPage({
  header,
  description,
  buttonText,
  buttonClickHandler
}: HeaderSkeletonPageProps) {
  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography variant="h4">{header}</Typography>

        <Typography component="p">{description}</Typography>
      </Box>

      {buttonText ? (
        <Button variant="contained" onClick={buttonClickHandler}>
          {buttonText}
        </Button>
      ) : null}
    </Box>
  )
}
