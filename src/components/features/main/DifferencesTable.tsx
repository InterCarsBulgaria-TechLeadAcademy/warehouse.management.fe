import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column.ts'
import { DifferenceDto } from '@/services/model'
import useGetDifferences from '@/hooks/services/differences/useGetDifferences'
import DifferencesTableActionsMenu from '../actionsMenu/DifferencesTableActionsMenu'
import { Typography } from '@mui/material'

interface Row {
  number: number
  internalNumber: string
  activeNumber: string
  receptionNumber: string
  count: number
  zone: string
  comment: string
  adminComment: React.ReactNode | string
  actions: React.ReactNode
}

export default function DifferencesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const differences = useGetDifferences()

  console.log(differences)

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
    { key: 'number', title: translate('differences.table.columns.number') },
    { key: 'internalNumber', title: translate('differences.table.columns.internalNumber') },
    { key: 'activeNumber', title: translate('differences.table.columns.activeNumber') },
    { key: 'receptionNumber', title: translate('differences.table.columns.receptionNumber') },
    { key: 'count', title: translate('differences.table.columns.count') },
    { key: 'zone', title: translate('differences.table.columns.zone') },
    { key: 'comment', title: translate('differences.table.columns.comment') },
    { key: 'adminComment', title: translate('differences.table.columns.admin-comment') },
    {
      key: 'actions',
      title: translate('differences.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(differences: DifferenceDto[]): Row[] {
    return differences.map((difference: DifferenceDto) => ({
      id: difference.id!,
      number: difference.id!,
      internalNumber: difference.internalNumber!,
      activeNumber: difference.activeNumber!,
      receptionNumber: difference.receptionNumber!,
      count: difference.count!,
      zone: difference.zone!,
      comment: difference.comment!,
      adminComment:
        difference.adminComment! === '' ? <Typography>-</Typography> : difference.adminComment,
      actions: <DifferencesTableActionsMenu key={difference.id} differences={differences} />
    }))
  }

  const rowData = transformDataToRows(differences.results! || [])

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
        placeholder={translate('zonesContent.filters.search')}
      />
    </DataTable>
  )
}
