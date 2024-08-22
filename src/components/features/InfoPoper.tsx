import * as React from 'react'
import Popover from '@mui/material/Popover'
import InfoIcon from '@mui/icons-material/Info'
import { Box } from '@mui/material'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'

interface InfoPopperProps {
  children: React.ReactNode
}

export default function InfoPopper({ children }: InfoPopperProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const isSmallScreen = useIsSmallScreen()

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isSmallScreen) {
      setOpen((prev) => !prev)
      setAnchorEl(event.currentTarget)
    } else {
      handlePopoverOpen(event)
    }
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!isSmallScreen) {
      handlePopoverOpen(event)
    }
  }

  const handleMouseLeave = () => {
    if (!isSmallScreen) {
      handlePopoverClose()
    }
  }

  return (
    <Box>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'center' }}>
        <InfoIcon />
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
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
