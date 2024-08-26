import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column.ts'
import ZonesContentTableActionsMenu from '../actionsMenu/ZonesContentActionsMenu'
import { EntryDto } from '@/services/model'
import useGetEntries from '@/hooks/services/entries/useGetEntries'
import ChipsList from '@/components/features/ChipsList.tsx'
import { getEntryStatus } from '@/utils/getEntryStatus.ts'

interface Row {
  number: number
  vendorName: string
  receptionNumber: number
  goodNumber: number
  status: string
  zoneName: string
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
    { key: 'vendorName', title: translate('zonesContent.table.columns.vendorName') },
    { key: 'receptionNumber', title: translate('zonesContent.table.columns.receptionNumber') },
    { key: 'goodNumber', title: translate('zonesContent.table.columns.goodNumber') },
    { key: 'zoneName', title: translate('zonesContent.table.columns.zoneName') },
    { key: 'status', title: translate('zonesContent.table.columns.status') },
    {
      key: 'actions',
      title: translate('zonesContent.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(entries: EntryDto[]): Row[] {
    return entries.map((entry: EntryDto) => ({
      id: entry.id!,
      number: entry.id!,
      vendorName: entry.deliveryDetails?.vendorName,
      receptionNumber: entry.deliveryDetails?.receptionNumber,
      goodNumber: entry.deliveryDetails?.systemNumber,
      zoneName: entry.zone?.zoneName || '-',
      status: <ChipsList items={[getEntryStatus(entry)]} />,
      actions: <ZonesContentTableActionsMenu key={entry.id} entry={entry} />
    }))
  }

  const rowData = transformDataToRows(entries.results! || [])

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
      rowsCount={entries.count}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('zonesContent.filters.search')}
      />

      {/*<FormControlLabel*/}
      {/*  value="start"*/}
      {/*  control={<Switch color="primary" onChange={handleToggleChange} />}*/}
      {/*  label={translate('zonesContent.filters.toggle')}*/}
      {/*  labelPlacement="start"*/}
      {/*/>*/}

      {/*<BaseFormDialog*/}
      {/*  open={openMoveEntryDialog}*/}
      {/*  onCloseDialog={onCloseMoveEntryDialog}*/}
      {/*  title={translate('zonesContent.labels.moveEntry')}*/}
      {/*  renderForm={(handleCloseForm) => (*/}
      {/*    <MoveEntryForm handleCloseForm={handleCloseForm} quantity={quantity} />*/}
      {/*  )}*/}
      {/*/>*/}
    </DataTable>
  )
}
