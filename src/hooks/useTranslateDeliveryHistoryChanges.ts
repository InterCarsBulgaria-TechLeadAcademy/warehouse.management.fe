import { useTranslation } from 'react-i18next'

enum Changes {
  StartedProcessing = 'StartedProcessing',
  FinishedProcessing = 'FinishedProcessing',
  ZoneId = 'ZoneId',
  LastModifiedByUserId = 'LastModifiedByUserId',
  LastModifiedAt = 'LastModifiedAt',
  AdminComment = 'AdminComment',
  IsApproved = 'IsApproved',
  ApprovedOn = 'ApprovedOn',
  Status = 'Status'
}

export default function useTranslateDeliveryHistoryChanges() {
  const { t: translate } = useTranslation()

  function getTranslateDeliveryHistoryChanges(change: string) {
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
      case Changes.AdminComment:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.adminComment'
        )
      case Changes.IsApproved:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.isApproved'
        )
      case Changes.ApprovedOn:
        return translate(
          'deliveries.table.actions.details.step5.table.table-body.changed.approvedOn'
        )
      case Changes.Status:
        return translate('deliveries.table.actions.details.step5.table.table-body.changed.status')
      default:
        return change
    }
  }

  return { getTranslateDeliveryHistoryChanges }
}
