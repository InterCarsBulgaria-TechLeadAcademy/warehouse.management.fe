import { StatusType } from '@/types/StatusType'

type ColorType =
  | 'default'
  | 'error'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'secondary.light'

export default function selectStatusColor(status: StatusType): ColorType {
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
      return 'secondary.light'
    default:
      return 'primary'
  }
}
