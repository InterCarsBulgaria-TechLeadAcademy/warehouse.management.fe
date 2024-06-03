import { Box } from '@mui/material'
import HeaderSkeletonPage from './HeaderSkeletonPage'

interface SkeletonPageProps {
  header: string
  description: string
  buttonText?: string
  buttonClickHandler?: React.MouseEventHandler<HTMLButtonElement>
  table: React.ReactNode
}

export default function SkeletonPage({
  header,
  description,
  buttonText,
  buttonClickHandler,
  table
}: SkeletonPageProps) {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        margin: '1em'
      }}>
      <HeaderSkeletonPage
        header={header}
        description={description}
        buttonText={buttonText}
        buttonClickHandler={buttonClickHandler}
      />

      <Box component="article">{table}</Box>
    </Box>
  )
}
