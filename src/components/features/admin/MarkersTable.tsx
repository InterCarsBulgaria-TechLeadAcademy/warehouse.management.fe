import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { MarkerDto } from '@/services/model'
import MarkersTableActionsMenu from '../actionsMenu/MarkersTableActionsMenu'

interface Row {
  name: string
  actions: React.ReactNode
}

export default function MarkersTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const columnsData: Column<Row>[] = [
    { key: 'name', title: translate('markers.table.name') },
    { key: 'actions', title: translate('markers.table.actions'), minWidth: 50, align: 'right' }
  ]

  const { data } = useSuspenseQuery({
    queryKey: ['markers'],
    queryFn: () => getWarehouseManagementApi().getApiMarkerAll()
  })

  console.log(data)

  let rowData: Row[] = []

  if (data) {
    rowData = data.map((marker: MarkerDto, index: number) => ({
      name: marker.name ?? '', //if marker.name is null/undefined, set ''
      actions: <MarkersTableActionsMenu key={index} />
    }))
  }

  const filteredRows = rowData.filter((row: Row) => {
    return columnsData.some((column: Column<Row>) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  return (
    <DataTable columnsData={columnsData} rowData={filteredRows}>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('vendors.labels.search')}
      />
    </DataTable>
  )
}
