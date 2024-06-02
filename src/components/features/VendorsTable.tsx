import ActionsMenu from '@/components/features/ActionsMenu'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'

export default function VendorsTable() {
  const { t: translate } = useTranslation()
  return (
    <DataTable
      hasSearchInput={true}
      isSortTextField={true}
      sortLabel={translate('vendors.labels.role')}
      sortOptionsData={['Proba1', 'Proba2']}
      columnsData={[
        { id: 'name', label: translate('vendors.table.name') },
        { id: 'vendorNumber', label: translate('vendors.table.vendorNumber') },
        { id: 'markers', label: translate('vendors.table.markers') },
        { id: 'actions', label: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
      ]}
      rowData={[
        { name: 'Bosch', vendorNumber: 1, markers: 'Масло', actions: <ActionsMenu /> },
        { name: 'Valeo', vendorNumber: 2, markers: 'Чистачки', actions: <ActionsMenu /> }
      ]}
    />
  )
}
