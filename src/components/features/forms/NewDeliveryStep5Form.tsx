import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ChipsList from '../ChipsList'

export default function NewDeliveryStep5Form() {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <Typography variant="h6">{translate('newDelivery.steps.deliveryDetails')}</Typography>
      <Box sx={{ display: 'flex', gap: '2em' }}>
        <Box>
          <Typography>{translate('newDelivery.labels.step1.deliveryNumber')}</Typography>
          <Typography>{formsData.deliveryNumber}</Typography>
        </Box>
        <Box>
          <Typography>{translate('newDelivery.labels.step1.receptionNumber')}</Typography>
          <Typography>{formsData.receptionNumber}</Typography>
        </Box>
        <Box>
          <Typography>{translate('newDelivery.labels.step1.cmrNumber')}</Typography>
          <Typography>{formsData.cmrNumber}</Typography>
        </Box>
        <Box>
          <Typography>{translate('newDelivery.labels.step1.markers')}</Typography>
          <Box sx={{ display: 'flex', gap: '1em' }}>
            {formsData.markers.map((marker: string, index: number) => (
              <Typography key={index}>{marker}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
