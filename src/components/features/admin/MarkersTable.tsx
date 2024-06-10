import React from 'react'

import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from '../../shared/TableActionsMenu'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/dataTable'

export default function MarkersTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  let columnsData: Column[] = [
    { key: 'name', title: translate('markers.table.name') },
    { key: 'actions', title: translate('markers.table.actions'), minWidth: 50, align: 'right' }
  ]

  let rowData = [
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
  ]

  const filteredRows = rowData.filter((row: any) => {
    return columnsData.some((column) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  return (
    <DataTable
      columnsData={columnsData}
      rowData={filteredRows}
    >
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('vendors.labels.search')}
      />
    </DataTable>
  )
}
