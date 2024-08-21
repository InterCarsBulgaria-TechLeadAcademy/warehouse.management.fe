import { useTranslation } from 'react-i18next'

enum ChangeTypes {
  Delivery = 'Delivery',
  Entry = 'Entry'
}

export default function useTranslateDeliveryHistoryChangeType() {
  const { t: translate } = useTranslation()

  function getTranslateDeliveryHistoryChangeType(changeType: string) {
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

  return { getTranslateDeliveryHistoryChangeType }
}
