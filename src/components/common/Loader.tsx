import { CircularProgress } from '@mui/material'

export type LoaderProps = {
  size?: number
}
export default function Loader({ size = 50 }: LoaderProps) {
  return <CircularProgress color="primary" size={size} />
}
