import useChipLabel from '@/hooks/useChipLabel'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import { StatusType } from '@/types/StatusType'
import selectStatusColor from '@/utils/selectStatusColor'
import { Box, Chip, ClickAwayListener, Grid, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'

interface MarkersProps {
  items: string[]
}

export default function ChipsList({ items }: MarkersProps) {
  const isSmallScreen = useIsSmallScreen()
  const { getChipLabel } = useChipLabel()
  const [open, setOpen] = React.useState(false)
  const theme: Theme = useTheme()

  let color = selectStatusColor(items[0] as StatusType)
  const chipLabel = `+ ${items.slice(2).length}`

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return items.length === 0 ? (
    <Typography>-</Typography>
  ) : (
    <Box sx={{ display: 'flex', gap: '0.5em' }}>
      {items.slice(0, 2).map((item, index) =>
        color === 'secondary.light' ? (
          <Chip
            key={index}
            label={getChipLabel(item)}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.mode === 'light' ? 'white' : ''
            }}
          />
        ) : (
          <Chip key={index} label={getChipLabel(item)} color={color} />
        )
      )}

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
          {color === 'secondary.light' ? (
            <Chip
              label={chipLabel}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.mode === 'light' ? 'white' : ''
              }}
            />
          ) : (
            <Chip label={chipLabel} color={color} />
          )}
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
                {color === 'secondary.light' ? (
                  <Chip
                    label={chipLabel}
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.mode === 'light' ? 'white' : ''
                    }}
                    onClick={handleTooltipOpen}
                  />
                ) : (
                  <Chip label={chipLabel} color={color} onClick={handleTooltipOpen} />
                )}
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Grid>
      )}
    </Box>
  )
}
