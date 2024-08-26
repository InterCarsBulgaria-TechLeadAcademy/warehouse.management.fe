import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import ChipsList from './ChipsList'
import useGetDelivery from '@/hooks/services/deliveries/useGetDelivery'
import MoveGoodsTable from './forms/newDeliveryForm/MoveGoodsTable'
import editEntriesArray from '@/utils/editEntriesArray'
import DeliveryHistoryTable from './DeliveryHistoryTable'

interface DeliveryDetailsProps {
  deliveryId: number
}

export default function DeliveryDetails({ deliveryId }: DeliveryDetailsProps) {
  const { t: translate } = useTranslation()
  const delivery = useGetDelivery(deliveryId)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
      <Typography variant="h5">
        {translate('deliveries.table.actions.details.title', { deliveryNumber: deliveryId })}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['1']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.steps.deliveryDetails')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step1.title')}</Typography>
            <Typography>{delivery.systemNumber}</Typography>
          </Box>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step1.receptionNumber')}
            </Typography>
            <Typography>{delivery.receptionNumber}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step1.cmr')}</Typography>
            <Typography>{delivery.cmr}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step1.markers')}</Typography>
            {delivery.markers ? (
              <ChipsList items={delivery.markers.map((marker) => marker.markerName!)} />
            ) : (
              '-'
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['2']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step2.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step2.vendorName')}
            </Typography>
            <Typography>{delivery.vendorName}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step2.vendorId')}</Typography>
            <Typography>{delivery.vendorId}</Typography>
          </Box>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step2.truckNumber')}
            </Typography>
            <Typography>{delivery.truckNumber}</Typography>
          </Box>
          <Box>
            <Typography>
              {translate('deliveries.table.actions.details.step2.deliveryTime')}
            </Typography>
            <Typography>{dayjs(delivery.deliveryTime).format('DD.MM.YYYY')}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['3']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step3.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step3.pallets')}</Typography>
            <Typography>{delivery.pallets}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step3.packages')}</Typography>
            <Typography>{delivery.packages}</Typography>
          </Box>
          <Box>
            <Typography>{translate('deliveries.table.actions.details.step3.pieces')}</Typography>
            <Typography>{delivery.pieces}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['4']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step4.title')}
          </Typography>
        </Box>

        <Box>
          <MoveGoodsTable
            array={editEntriesArray(delivery!.entries!)}
            goodType={'goodType'}
            goodQuantity={'goodQuantity'}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <ChipsList items={['5']} />
          <Typography variant="h6">
            {translate('deliveries.table.actions.details.step5.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '2em' }}>
          <Box>
            <DeliveryHistoryTable deliveryId={deliveryId} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
