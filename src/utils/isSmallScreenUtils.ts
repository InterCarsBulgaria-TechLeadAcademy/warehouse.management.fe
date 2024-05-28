import { useMediaQuery } from '@mui/material'

export function isSmallScreenUtils(): boolean {
  const isSmallScreen = useMediaQuery('(max-width: 800px)')
  return isSmallScreen
}
