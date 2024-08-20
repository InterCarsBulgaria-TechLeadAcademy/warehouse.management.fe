import { useTranslation } from 'react-i18next'

enum Changes {
  StartedProcessing = 'StartedProcessing',
  FinishedProcessing = 'FinishedProcessing',
  ZoneId = 'ZoneId',
  LastModifiedByUserId = 'LastModifiedByUserId',
  LastModifiedAt = 'LastModifiedAt'
}

export default function useTranslateDeliveryHistoryChanges(change: string) {
  const { t: translate } = useTranslation()
  switch (change) {
    case Changes.StartedProcessing:
      return translate(
        'deliveries.table.actions.details.step5.table.table-body.changed.startedProcessing'
      )
    case Changes.FinishedProcessing:
      return translate(
        'deliveries.table.actions.details.step5.table.table-body.changed.finishedProcessing'
      )
    case Changes.ZoneId:
      return translate('deliveries.table.actions.details.step5.table.table-body.changed.zone')
    case Changes.LastModifiedByUserId:
      return translate(
        'deliveries.table.actions.details.step5.table.table-body.changed.lastModifiedByUserId'
      )
    case Changes.LastModifiedAt:
      return translate(
        'deliveries.table.actions.details.step5.table.table-body.changed.lastModifiedAt'
      )
    default:
      return change
  }
}
