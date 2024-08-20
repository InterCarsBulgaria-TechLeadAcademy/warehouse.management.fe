import { useTranslation } from 'react-i18next'

enum ChangeTypes {
  Delivery = 'Delivery',
  Entry = 'Entry'
}

export default function useTranslateDeliveryHistoryChangeType(changeType: string) {
  const { t: translate } = useTranslation()
  switch (changeType) {
    case ChangeTypes.Delivery:
      return translate(
        'deliveries.table.actions.details.step5.table.table-body.changeType.delivery'
      )
    case ChangeTypes.Entry:
      return translate('deliveries.table.actions.details.step5.table.table-body.changeType.entry')
    default:
      return changeType
  }
}
