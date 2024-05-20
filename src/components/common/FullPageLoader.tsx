import { Box } from '@mui/material'
import Loader, { LoaderProps } from '@/components/common/Loader.tsx'

type FullPageLoaderProps = LoaderProps

export function FullPageLoader(props: FullPageLoaderProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
      <Loader {...props} />
    </Box>
  )
}
