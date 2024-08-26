import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ChipsList from '../../ChipsList'
import dayjs from 'dayjs'
import { Good } from '@/hooks/useSetGoodsType.ts'
import useGetMarkers from '@/hooks/services/markers/useGetMarkers'
import MoveGoodsTable from './MoveGoodsTable'

export default function NewDeliveryStep5Form() {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  const markers = useGetMarkers()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['1']} />
          <Typography variant="h6">
            {translate('deliveries.newDelivery.steps.deliveryDetails')} №
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>
              {' '}
              {translate('deliveries.newDelivery.labels.step1.systemNumber')}
            </Typography>
            <Typography>{formsData.systemNumber.join(', ')}</Typography>
          </Box>
          <Box>
            <Typography>
              {translate('deliveries.newDelivery.labels.step1.receptionNumber')}
            </Typography>
            <Typography>{formsData.receptionNumber.join(', ')}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.newDelivery.labels.step1.cmrNumber')}</Typography>
            <Typography>{formsData.cmr}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.newDelivery.labels.step1.markers')}</Typography>
            <ChipsList
              items={formsData.markers.map((markerId: number) => {
                const marker = markers.find(
                  (marker) => marker.id?.toString() === markerId.toString()
                )
                return marker ? marker.name : ''
              })}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['2']} />
          <Typography variant="h6">
            {translate('deliveries.newDelivery.steps.truckDetails')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>{translate('deliveries.newDelivery.labels.step2.vendorName')}</Typography>
            <Typography>{formsData.vendorName}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.newDelivery.labels.step2.vendorId')}</Typography>
            <Typography>{formsData.vendorId}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.newDelivery.labels.step2.truckNumber')}</Typography>
            <Typography>{formsData.truckNumber}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.newDelivery.labels.step2.deliveryTime')}</Typography>
            <Typography>{dayjs(formsData.deliveryTime).format('DD.MM.YYYY')}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['3']} />
          <Typography variant="h6">
            {translate('deliveries.newDelivery.steps.goodDetails')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          {formsData.goods.map((good: Good, index: number) => {
            return (
              <Box key={index}>
                <Typography>
                  {translate(`deliveries.newDelivery.goodType.${good.goodTypeStep3}`)}
                </Typography>
                <Typography>{good.goodQuantityStep3}</Typography>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['4']} />
          <Typography variant="h6">
            {translate('deliveries.newDelivery.steps.goodRelocate')}
          </Typography>
        </Box>

        <Box>
          <MoveGoodsTable
            array={formsData.goodsInZones}
            goodType={'goodTypeStep4'}
            goodQuantity={'goodQuantityStep4'}
            currentZoneId={'zone'}
          />
        </Box>
      </Box>
    </Box>
  )
}
