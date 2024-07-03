import * as React from 'react'
import Box from '@mui/material/Box'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import InfoIcon from '@mui/icons-material/Info'
import { useTranslation } from 'react-i18next'

interface GoodType {
  title: string
  value: string
  quantity: number
}

interface PositionedPopperProps {
  goodTypes: GoodType[]
}

export default function PositionedPopper({ goodTypes }: PositionedPopperProps) {
  const { t: translate } = useTranslation()
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
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ width: '200px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em', padding: '1em' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>
                    <b>{translate('deliveries.poper.type')}</b>
                  </Typography>
                  <Typography>
                    <b>{translate('deliveries.poper.quantity')}</b>
                  </Typography>
                </Box>
                {goodTypes.map((goodType: GoodType, index: number) => {
                  return (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{goodType.title}</Typography>
                      <Typography>{goodType.quantity}</Typography>
                    </Box>
                  )
                })}
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
