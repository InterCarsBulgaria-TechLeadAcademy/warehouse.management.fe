import { EntriesProcessingDetails } from '@/services/model'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface DeliveryGoodsInfoProps {
  goods: EntriesProcessingDetails
}

export default function DeliveryGoodsInfo({ goods }: DeliveryGoodsInfoProps) {
  const { t: translate } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em', padding: '1em' }}>
      <Box sx={{ display: 'flex', gap: '2em', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 'bold' }}>
          {translate('deliveries.table.poper.type')}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>
          {translate('deliveries.table.poper.quantity')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{translate('deliveries.table.poper.types.pallets')}</Typography>
        <Typography>{goods.pallets}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{translate('deliveries.table.poper.types.packages')}</Typography>
        <Typography>{goods.packages}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{translate('deliveries.table.poper.types.pieces')}</Typography>
        <Typography>{goods.pieces}</Typography>
      </Box>
    </Box>
  )
}
