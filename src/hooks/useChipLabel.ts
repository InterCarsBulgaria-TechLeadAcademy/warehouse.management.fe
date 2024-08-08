import { useTranslation } from 'react-i18next'

export default function useChipLabel(item: any) {
  const { t: translate } = useTranslation()
  switch (item) {
    case 'Waiting':
      return translate('deliveries.table.rows.status.waiting')
    case 'Processing':
      return translate('deliveries.table.rows.status.processing')
    case 'Finished':
      return translate('deliveries.table.rows.status.finished')
    case 'Approved':
      return translate('deliveries.table.rows.status.approved')
    default:
      return item
  }
}
