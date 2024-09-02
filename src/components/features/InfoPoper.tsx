import * as React from 'react'
import Popover from '@mui/material/Popover'
import InfoIcon from '@mui/icons-material/Info'
import { Box, ClickAwayListener } from '@mui/material'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'

interface InfoPopperProps {
  children: React.ReactNode
}

export default function InfoPopper({ children }: InfoPopperProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const isSmallScreen = useIsSmallScreen()

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isSmallScreen) {
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

  const handleClickAway = () => {
    if (open) {
      handlePopoverClose()
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Box
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{ display: 'flex', cursor: 'pointer' }}>
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
    </ClickAwayListener>
  )
}
