import { StatusType } from '@/types/StatusType'
import { Theme, useTheme } from '@mui/material/styles'

type ColorType = 'default' | 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning'

export default function selectStatusColor(status: StatusType): ColorType {
  const theme: Theme = useTheme()
  console.log(theme)
  switch (status) {
    case 'Waiting':
      return 'secondary'
    case 'Processing':
      return 'warning'
    case 'Finished':
      return 'info'
    case 'Approved':
      return 'success'
    case 'NoDifferences':
      return 'success'
    default:
      return 'primary'
  }
}
