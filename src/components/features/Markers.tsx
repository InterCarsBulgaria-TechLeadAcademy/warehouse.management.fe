import { isSmallScreenUtils } from '@/utils/isSmallScreenUtils'
import { Box, Chip, ClickAwayListener, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'

interface MarkersProps {
  markers: string[]
}

export default function Markers({ markers }: MarkersProps) {
  const isSmallScreen: boolean = isSmallScreenUtils()

  const [open, setOpen] = React.useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }
  return (
    <Box sx={{ display: 'flex', gap: '0.5em' }}>
      {markers.length <= 2 &&
        markers.map((marker, index) => <Chip key={index} label={marker} color="primary" />)}

      {markers.length > 2 &&
        markers
          .slice(0, 2)
          .map((marker, index) => <Chip key={index} label={marker} color="primary" />)}

      {markers.length > 2 && !isSmallScreen && (
        <Tooltip
          sx={{ textDecoration: 'none' }}
          title={
            <Box>
              {markers.slice(2).map((marker, index) => (
                <Typography key={index} variant="body1">
                  {marker}
                </Typography>
              ))}
            </Box>
          }
          arrow>
          <Button>+ {markers.slice(2).length}</Button>
        </Tooltip>
      )}

      {markers.length > 2 && isSmallScreen && (
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
                    {markers.slice(2).map((marker, index) => (
                      <Typography key={index} variant="body1">
                        {marker}
                      </Typography>
                    ))}
                  </Box>
                }>
                <Button onClick={handleTooltipOpen}>+ {markers.slice(2).length}</Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Grid>
      )}
    </Box>
  )
}
