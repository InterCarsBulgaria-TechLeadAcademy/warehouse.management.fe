import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from '../shared/TableActionsMenu'

export default function MarkersTable() {
  const { t: translate } = useTranslation()

  return (
    <DataTable
      hasSearchInput={true}
      isSortTextField={false}
      isToggle={false}
      columnsData={[
        { key: 'name', title: translate('markers.table.name') },
        { key: 'actions', title: translate('markers.table.actions'), minWidth: 50, align: 'right' }
      ]}
      rowData={[
        {
          name: 'Motoul',
          vendorNumber: 1,
          markers: 'Масло',
          actions: <TableActionsMenu itemProps={['update', 'delete']} page='markers' />
        },
        {
          name: 'Ferodo',
          vendorNumber: 2,
          markers: 'Накладки',
          actions: <TableActionsMenu itemProps={['update', 'delete']} page='markers' />
        }
      ]}
    />
  )
}
