import { isSmallScreenUtils } from '@/utils/isSmallScreenUtils'
import { Box, Chip, ClickAwayListener, Grid, Typography } from '@mui/material'
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

  const chipLabel = `+ ${markers.slice(2).length}`
  return (
    <Box sx={{ display: 'flex', gap: '0.5em' }}>
      {markers.length <= 2 &&
        markers.map((marker, index) => <Chip key={index} label={marker} color="primary" />)}

      {markers.length > 2 &&
        markers
          .slice(0, 2)
          .map((marker, index) => <Chip key={index} label={marker} color="primary" />)}

      {markers.length > 2 && !isSmallScreen && (
        <>
          <Tooltip
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
            <Chip label={chipLabel} color="primary" />
          </Tooltip>
        </>
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
                <Chip label={chipLabel} color="primary" onClick={handleTooltipOpen} />
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Grid>
      )}
    </Box>
  )
}
