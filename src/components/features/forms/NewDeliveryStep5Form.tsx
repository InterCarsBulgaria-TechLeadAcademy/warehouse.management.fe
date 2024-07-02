import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ChipsList from '../ChipsList'

export default function NewDeliveryStep5Form() {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <Box>
        <Typography variant="h6">{translate('newDelivery.steps.deliveryDetails')} №</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['1']} />
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
              <ChipsList items={formsData.markers} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6">{translate('newDelivery.steps.truckDetails')}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['2']} />
          <Box sx={{ display: 'flex', gap: '2em' }}>
            <Box>
              <Typography>{translate('newDelivery.labels.step2.vendorName')}</Typography>
              <Typography>{formsData.vendorName}</Typography>
            </Box>
            <Box>
              <Typography>{translate('newDelivery.labels.step2.vendorId')}</Typography>
              <Typography>{formsData.vendorId}</Typography>
            </Box>
            <Box>
              <Typography>{translate('newDelivery.labels.step2.truckNumber')}</Typography>
              <Typography>{formsData.truckNumber}</Typography>
            </Box>
            <Box>
              <Typography>{translate('newDelivery.labels.step2.deliveryDate')}</Typography>
              {/* <Typography>{formsData.deliveryDate}</Typography> */}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6">{translate('newDelivery.steps.goodDetails')}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}></Box>
      </Box>

      <Box>
        <Typography variant="h6">{translate('newDelivery.steps.goodRelocate')}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}></Box>
      </Box>
    </Box>
  )
}
