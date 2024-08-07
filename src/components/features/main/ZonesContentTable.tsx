import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Switch } from '@mui/material'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column.ts'
import BaseFormDialog from '@/components/shared/BaseFormDialog'
import {
  useMoveEntryDialog,
  ZonesTableActions
} from '@/hooks/dialogs/zonesContent/useMoveEntryDialog'
import MoveEntryForm from '../forms/MoveEntryForm'
import TableActionsMenu from '../actionsMenu/TableActionsMenu'
import ZonesContentTableActionsMenu from '../actionsMenu/ZonesContentActionsMenu'
import { EntryDto } from '@/services/model'
import useGetEntries from '@/hooks/services/entries/useGetEntries'

interface Row {
  number: number
  vendorName: string
  receptionNumber: number
  goodNumber: number
  status: string
  actions: React.ReactNode
}

export default function ZonesContentTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const entries = useGetEntries(page, rowsPerPage, searchTerm)

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
    { key: 'number', title: translate('zonesContent.table.columns.number') },
    { key: 'vendorName', title: translate('zonesContent.table.columns.number') },
    { key: 'receptionNumber', title: translate('zonesContent.table.columns.receptionNumber') },
    { key: 'goodNumber', title: translate('zonesContent.table.columns.goodNumber') },
    { key: 'status', title: translate('zonesContent.table.columns.status') },
    {
      key: 'actions',
      title: translate('zonesContent.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  console.log(entries)

  // function transformDataToRows(entries: EntryDto[]): Row[] {
  //   return entries.map((entry: EntryDto) => ({
  //     id: entry.id!,
  //     number: entry.id!,
  //     vendorName: entry.vendorName,
  //     receptionNumber: entry.receptionNumber,
  //     goodNumber: entry.goodNumber
  //     actions: <ZonesContentTableActionsMenu key={entry.id} zoneContent={entries} />
  //   }))
  // }

  // const rowData = transformDataToRows(entries.results! || [])

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

      <FormControlLabel
        value="start"
        control={<Switch color="primary" onChange={handleToggleChange} />}
        label={translate('zonesContent.filters.toggle')}
        labelPlacement="start"
      />

      <BaseFormDialog
        open={openMoveEntryDialog}
        onCloseDialog={onCloseMoveEntryDialog}
        title={translate('zonesContent.labels.moveEntry')}
        renderForm={(handleCloseForm) => (
          <MoveEntryForm handleCloseForm={handleCloseForm} quantity={quantity} />
        )}
      />
    </DataTable>
  )
}
