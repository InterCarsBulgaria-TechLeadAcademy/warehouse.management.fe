import { useTranslation } from 'react-i18next'

export enum ChipStatus {
  Waiting = 'Waiting',
  Processing = 'Processing',
  Finished = 'Finished',
  Approved = 'Approved',
  NoDifferences = 'NoDifferences'
}

export default function useChipLabel() {
  const { t: translate } = useTranslation()

  function getChipLabel(item: string) {
    switch (item) {
      case ChipStatus.Waiting:
        return translate('deliveries.table.rows.status.waiting')
      case ChipStatus.Processing:
        return translate('deliveries.table.rows.status.processing')
      case ChipStatus.Finished:
        return translate('deliveries.table.rows.status.finished')
      case ChipStatus.Approved:
        return translate('deliveries.table.rows.status.approved')
      case ChipStatus.NoDifferences:
        return translate('deliveries.table.rows.status.noDifferences')
      default:
        return item
    }
  }

  return { getChipLabel }
}
