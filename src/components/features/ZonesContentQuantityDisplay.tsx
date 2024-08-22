import { EntryDto } from '@/services/model'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ZonesContentQuantityDisplayProps {
  entry: EntryDto
}

export default function ZonesContentQuantityDisplay({ entry }: ZonesContentQuantityDisplayProps) {
  const { t: translate } = useTranslation()
  const goods = [
    {
      goodName: translate('zonesContent.table.rows.quantity-column.goodTypes.pallets'),
      goodQuantity: entry.pallets!
    },
    {
      goodName: translate('zonesContent.table.rows.quantity-column.goodTypes.packages'),
      goodQuantity: entry.packages!
    },
    {
      goodName: translate('zonesContent.table.rows.quantity-column.goodTypes.pieces'),
      goodQuantity: entry.pieces!
    }
  ].filter((item) => item.goodQuantity > 0)

  return goods.map((good, index) => (
    <Typography key={index}>
      {good.goodName}: {good.goodQuantity}
    </Typography>
  ))
}
