import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import ZonesTableActionsMenu from './ZonesTableActionsMenu'
import Markers from './Markers'

export default function ZonesTable() {
  const { t: translate } = useTranslation()

  return (
    <DataTable
      hasSearchInput={true}
      isSortTextField={true}
      sortLabel={translate('zones.labels.markers')}
      sortOptionsData={['Гуми', 'Масло']}
      columnsData={[
        { key: 'name', title: translate('zones.table.name') },
        { key: 'markers', title: translate('zones.table.markers') },
        { key: 'isFinalZone', title: translate('zones.table.isFinalZone') },
        { key: 'actions', title: translate('zones.table.actions'), minWidth: 50, align: 'right' }
      ]}
      rowData={[
        {
          name: 'Зона 1',
          markers: <Markers markers={['Гуми', 'Масло', 'Чистачки', 'Филтри', 'Брони']} />,
          isFinalZone: 'Да',
          actions: <ZonesTableActionsMenu />
        },
        {
          name: 'Зона 2',
          markers: <Markers markers={['Чистачки', 'Брони']} />,
          isFinalZone: 'Не',
          actions: <ZonesTableActionsMenu />
        }
      ]}
    />
  )
}
