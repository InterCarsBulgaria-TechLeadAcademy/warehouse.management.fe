import * as React from 'react'
import Box from '@mui/material/Box'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import InfoIcon from '@mui/icons-material/Info'

interface PositionedPopperProps {
  content: string
}
// Май е по-добре да използвам toolip
export default function PositionedPopper({ content }: PositionedPopperProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState<PopperPlacementType>()

  const handleClick =
    (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
      setOpen((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
    }

  return (
    <Box>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        // sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {/* <Typography sx={{ p: 2 }}>{content}</Typography> */}
              <Box>
                <Box sx={{ display: 'flex', gap: '2em', padding: '1em' }}>
                  <Typography>Тип</Typography>
                  <Typography>Количество</Typography>
                </Box>
                <Box>
                  {/* <Typography>Палети</Typography>
                  <Typography>Количество</Typography> */}
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Grid container justifyContent="center">
        <Grid item>
          <Button onClick={handleClick('bottom-start')}>
            <InfoIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
