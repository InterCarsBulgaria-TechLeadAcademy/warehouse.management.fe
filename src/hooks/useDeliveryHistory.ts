import { useTranslation } from 'react-i18next'
import {
  DeliveryHistoryChangeType,
  DeliveryHistoryEntityPropertyChange,
  LogType
} from '@/services/model'
import { formatDate } from '@/utils/dateHelpers.ts'

export function useDeliveryHistory() {
  const { t: translate } = useTranslation()

  function formatDeliveryChangeValue(
    value: string | null | undefined,
    propertyChange: DeliveryHistoryEntityPropertyChange
  ) {
    if (value == null) return '-'

    if (
      propertyChange === DeliveryHistoryEntityPropertyChange.StartedProcessing ||
      propertyChange === DeliveryHistoryEntityPropertyChange.FinishedProcessing
    ) {
      return formatDate(value)
    }

    if (propertyChange === DeliveryHistoryEntityPropertyChange.Status) {
      return translate(`deliveries.table.actions.details.step5.table.table-body.changed.${value}`)
    }

    return value
  }

  function translatePropertyName(
    logType: LogType,
    propertyChange: DeliveryHistoryEntityPropertyChange
  ) {
    switch (logType) {
      case LogType.DeliveryStatusChange:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.deliveryStatusChange'
        )
      case LogType.EntryStatusChange:
        if (propertyChange == DeliveryHistoryEntityPropertyChange.StartedProcessing) {
          return translate(
            'deliveries.table.actions.details.step5.table.table-body.changed.entryStartedProcessing'
          )
        } else if (propertyChange == DeliveryHistoryEntityPropertyChange.FinishedProcessing) {
          return translate(
            'deliveries.table.actions.details.step5.table.table-body.changed.entryFinishedProcessing'
          )
        }

        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.entryStatusChange'
        )
      case LogType.DifferenceStatusChange:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.differenceStatusChange'
        )
      case LogType.DifferenceAdminComment:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.adminComment'
        )
      case LogType.ZoneChange:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.zoneChange'
        )
      case LogType.Split:
        return translate('deliveries.table.actions.details.step5.table.table-body.changed.split')
      default:
        return logType
    }
  }

  function translateChangeType(changeType: DeliveryHistoryChangeType) {
    switch (changeType) {
      case DeliveryHistoryChangeType.Delivery:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changeType.delivery'
        )
      case DeliveryHistoryChangeType.Entry:
        return translate('deliveries.table.actions.details.step5.table.table-body.changeType.entry')
      case DeliveryHistoryChangeType.Difference:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changeType.difference'
        )
      default:
        return changeType
    }
  }

  return {
    formatDeliveryChangeValue,
    translatePropertyName,
    translateChangeType
  }
}
