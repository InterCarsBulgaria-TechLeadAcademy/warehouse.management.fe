import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from '../shared/TableActionsMenu'

export default function ZonesTable() {
  const { t: translate } = useTranslation()

  return (
    <DataTable
      hasSearchInput={true}
      isSortTextField={false}
      isToggle={true}
      toggleLabel={translate('zones.labels.toggle')}
      columnsData={[
        { key: 'entryNumber', title: translate('zones.table.entryNumber') },
        { key: 'vendorName', title: translate('zones.table.vendorName') },
        { key: 'receptionNumbers', title: translate('zones.table.receptionNumbers') },
        { key: 'numberOfGoods', title: translate('zones.table.numberOfGoods') },
        { key: 'status', title: translate('zones.table.status') },
        { key: 'actions', title: translate('markers.table.actions'), minWidth: 50, align: 'right' }
      ]}
      rowData={[
        {
          entryNumber: 1,
          vendorName: 'truck',
          receptionNumbers: 12,
          numberOfGoods: 33,
          status: 'finished',
          actions: <TableActionsMenu itemProps={['MoveToNewZone', 'StartProcessing', 'FinishProcessing', 'DeliveryDetails']} page='zones' />
        },
        {
          entryNumber: 2,
          vendorName: 'truck',
          receptionNumbers: 12,
          numberOfGoods: 52,
          status: 'processing',
          markers: 'Накладки',
          actions: <TableActionsMenu itemProps={['MoveToNewZone', 'StartProcessing', 'FinishProcessing', 'DeliveryDetails']} page='zones' />
        }
      ]}
    />
  )
}
