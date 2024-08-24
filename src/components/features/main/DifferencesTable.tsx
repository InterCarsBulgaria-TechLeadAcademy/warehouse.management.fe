import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column.ts'
import { DifferenceDto } from '@/services/model'
import useGetDifferences from '@/hooks/services/differences/useGetDifferences'
import DifferencesTableActionsMenu from '../actionsMenu/DifferencesTableActionsMenu'
import { formatDate } from '@/utils/dateHelpers'
import ChipsList from '../ChipsList'
import Comment from '../Comment'

interface Row {
  number: number
  internalNumber: string
  activeNumber: string
  receptionNumber: string
  count: number
  zone: string
  comment: React.ReactNode
  adminComment: React.ReactNode
  status: React.ReactNode
  type: string
  createdAt: string
  deliverySystemNumber: string
  actions: React.ReactNode
}

export default function DifferencesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const differences = useGetDifferences(page, rowsPerPage, searchTerm)

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
    { key: 'status', title: translate('differences.table.columns.status') },
    { key: 'type', title: translate('differences.table.columns.type') },
    { key: 'createdAt', title: translate('differences.table.columns.createdAt') },
    {
      key: 'deliverySystemNumber',
      title: translate('differences.table.columns.delivery-systemNumber')
    },
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
      comment: <Comment comment={difference.comment!} />,
      adminComment: <Comment comment={difference.adminComment!} />,
      status: <ChipsList items={[difference.status!]} />,
      type: difference.type!,
      createdAt: formatDate(difference.createdAt!),
      deliverySystemNumber: difference.deliverySystemNumber!,
      actions: <DifferencesTableActionsMenu key={difference.id} difference={difference} />
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
      rowsCount={differences.count}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('differences.filters.search')}
      />
    </DataTable>
  )
}
