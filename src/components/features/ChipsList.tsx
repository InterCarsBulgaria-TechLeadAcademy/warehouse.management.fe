import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import { Box, Chip, ClickAwayListener, Grid, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'

interface MarkersProps {
  items: string[]
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

export default function ChipsList({ items, color }: MarkersProps) {
  const isSmallScreen = useIsSmallScreen()

  const [open, setOpen] = React.useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const chipLabel = `+ ${items.slice(2).length}`
  return (
    <Box sx={{ display: 'flex', gap: '0.5em' }}>
      {items.slice(0, 2).map((item, index) => (
        <Chip key={index} label={item} color={color ? color : 'primary'} />
      ))}

      {items.length > 2 && !isSmallScreen && (
        <Tooltip
          title={
            <Box>
              {items.slice(2).map((item, index) => (
                <Typography key={index} variant="body1">
                  {item}
                </Typography>
              ))}
            </Box>
          }
          arrow>
          <Chip label={chipLabel} color="primary" />
        </Tooltip>
      )}

      {items.length > 2 && isSmallScreen && (
        <Grid item>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box>
                    {items.slice(2).map((item, index) => (
                      <Typography key={index} variant="body1">
                        {item}
                      </Typography>
                    ))}
                  </Box>
                }>
                <Chip label={chipLabel} color="primary" onClick={handleTooltipOpen} />
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Grid>
      )}
    </Box>
  )
}
