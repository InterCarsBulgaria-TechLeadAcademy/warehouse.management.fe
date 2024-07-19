import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column'
import { MarkerDto } from '@/services/model'
import MarkersTableActionsMenu from '../actionsMenu/MarkersTableActionsMenu'
import useGetMarkers from '@/hooks/services/markers/useGetMarkers'

interface Row {
  id: number
  name: string
  actions: React.ReactNode
}

export default function MarkersTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const markers = useGetMarkers()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const columnsData: Column<Row>[] = [
    { key: 'name', title: translate('markers.table.columns.name') },
    {
      key: 'actions',
      title: translate('markers.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(markers: MarkerDto[]): Row[] {
    return markers.map((marker: MarkerDto) => ({
      id: marker.id!,
      name: marker.name!,
      actions: <MarkersTableActionsMenu key={marker.id} marker={marker} />
    }))
  }

  const rowData = transformDataToRows(markers || [])

  const filteredRows = rowData.filter((row: Row) => {
    return columnsData.some((column: Column<Row>) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  return (
    <DataTable
      columnsData={columnsData}
      rowData={filteredRows}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('vendors.filters.search')}
      />
    </DataTable>
  )
}
