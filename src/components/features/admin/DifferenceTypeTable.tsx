import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column'
import { DifferenceTypeDto } from '@/services/model'
import useGetDifferenceTypes from '@/hooks/services/differenceType/useGetDifferenceTypes'
import DifferentTypeTableActionsMenu from '../actionsMenu/DifferentTypeTableActionsMenu'

interface Row {
  id: number
  name: string
  actions: React.ReactNode
}

export default function DifferenceTypeTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const differenceTypes = useGetDifferenceTypes()

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
    { key: 'id', title: translate('differenceType.table.columns.number') },
    { key: 'name', title: translate('differenceType.table.columns.name') },
    {
      key: 'actions',
      title: translate('differenceType.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(differenceTypes: DifferenceTypeDto[]): Row[] {
    return differenceTypes.map((differenceType: DifferenceTypeDto) => ({
      id: differenceType.id!,
      name: differenceType.name!,
      actions: (
        <DifferentTypeTableActionsMenu key={differenceType.id} differenceType={differenceType} />
      )
    }))
  }

  const rowData = transformDataToRows(differenceTypes || [])

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
        placeholder={translate('differenceType.filters.search')}
      />
    </DataTable>
  )
}
