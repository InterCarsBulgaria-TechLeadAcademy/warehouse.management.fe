export type StatusType = 'Waiting' | 'Processing' | 'Finished' | 'Approved'
type ColorType = 'default' | 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning'

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
    default:
      return 'primary'
  }
}
