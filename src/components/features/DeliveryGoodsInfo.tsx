import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface GoodType {
  title: string
  value: string
  quantity: number
}

export default function DeliveryGoodsInfo({ goodTypes }: any) {
  const { t: translate } = useTranslation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em', padding: '1em' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 'bold' }}>{translate('deliveries.poper.type')}</Typography>
        <Typography sx={{ fontWeight: 'bold' }}>
          {translate('deliveries.poper.quantity')}
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
  )
}
