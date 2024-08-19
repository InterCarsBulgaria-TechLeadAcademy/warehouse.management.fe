import dateHelpers from '@/utils/dateHelpers'
import { Typography } from '@mui/material'
type TDate = string | Date

export default function useDateHelpers(date: TDate) {
  const formatedDate = dateHelpers(date)
  if (formatedDate === 'Invalid Date') {
    return <Typography>-</Typography>
  } else {
    return formatedDate
  }
}
