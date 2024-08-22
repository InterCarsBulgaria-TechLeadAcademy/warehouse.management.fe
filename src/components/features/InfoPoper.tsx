import * as React from 'react'
import Popover from '@mui/material/Popover'
import InfoIcon from '@mui/icons-material/Info'
import { Box } from '@mui/material'

interface InfoPopperProps {
  children: React.ReactNode
}

export default function InfoPopper({ children }: InfoPopperProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'center' }}>
        <InfoIcon />
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        {children}
      </Popover>
    </Box>
  )
}
