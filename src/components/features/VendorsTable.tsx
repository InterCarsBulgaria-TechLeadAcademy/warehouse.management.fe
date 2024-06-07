import VendorTableActionsMenu from '@/components/features/VendorTableActionsMenu'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'

export default function VendorsTable() {
  const { t: translate } = useTranslation()

  return (
    <DataTable
      hasSearchInput={true}
      isSortTextField={true}
      isToggle={false}
      sortLabel={translate('vendors.labels.role')}
      sortOptionsData={['Proba1', 'Proba2']}
      columnsData={[
        { key: 'name', title: translate('vendors.table.name') },
        { key: 'vendorNumber', title: translate('vendors.table.vendorNumber') },
        { key: 'markers', title: translate('vendors.table.markers') },
        { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
      ]}
      rowData={[
        {
          name: 'Bosch',
          vendorNumber: 1,
          markers: 'Масло',
          actions: <VendorTableActionsMenu />
        },
        {
          name: 'Valeo',
          vendorNumber: 2,
          markers: 'Чистачки',
          actions: <VendorTableActionsMenu />
        }
      ]}
    />
  )
}
