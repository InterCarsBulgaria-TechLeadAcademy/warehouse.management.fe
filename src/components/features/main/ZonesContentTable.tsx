import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column.ts'
import ZonesContentTableActionsMenu from '../actionsMenu/ZonesContentActionsMenu'
import { EntryDto, EntryStatuses } from '@/services/model'
import useGetEntries from '@/hooks/services/entries/useGetEntries'
import ChipsList from '@/components/features/ChipsList.tsx'
import { getEntryStatus } from '@/utils/getEntryStatus.ts'
import {
  OutlinedInput,
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent
} from '@mui/material'
import useGetZones from '@/hooks/services/zones/useGetZones'
import useChipLabel, { ChipStatus } from '@/hooks/useChipLabel'

interface Row {
  number: number
  vendorName: string
  receptionNumber: string
  goodNumber: string
  status: React.ReactNode
  zoneName: string
  actions: React.ReactNode
}

export default function ZonesContentTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedZoneId, setSelectedZoneId] = React.useState('')
  const [selectedStatuses, setSelectedStatuses] = React.useState<EntryStatuses[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const zones = useGetZones()
  const entries = useGetEntries(
    page,
    rowsPerPage,
    searchTerm,
    selectedZoneId ? Number(selectedZoneId) : undefined,
    selectedStatuses ? selectedStatuses : undefined
  )

  const { getChipLabel } = useChipLabel()
  const statusOptions = Object.values(ChipStatus)
    .slice(0, 3)
    .map((status) => ({
      value: status,
      label: getChipLabel(status)
    }))

  console.log(selectedStatuses)

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
      vendorName: entry.deliveryDetails?.vendorName!,
      receptionNumber: entry.deliveryDetails?.receptionNumber!,
      goodNumber: entry.deliveryDetails?.systemNumber!,
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

      <Autocomplete
        options={zones}
        getOptionLabel={(option) => option.name || ''}
        value={zones.find((zone) => zone.id!.toString() === selectedZoneId) || null}
        onChange={(_event, newValue) => {
          const newZoneId = newValue ? newValue.id!.toString() : ''
          setSelectedZoneId(newZoneId)
        }}
        inputValue={zones.find((zone) => zone.id!.toString() === selectedZoneId)?.name || ''}
        id="zones-filter"
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('zonesContent.filters.zones')} />
        )}
      />

      <FormControl sx={{ width: '235px' }} size="small">
        <InputLabel id="status-multiple-checkbox-label">
          {translate('zonesContent.filters.statuses')}
        </InputLabel>
        <Select
          labelId="status-multiple-checkbox-label"
          id="statuses"
          multiple
          value={selectedStatuses}
          onChange={(event: SelectChangeEvent<typeof selectedStatuses>) => {
            setSelectedStatuses(event.target.value as EntryStatuses[])
          }}
          input={<OutlinedInput label={translate('zonesContent.filters.statuses')} />}
          renderValue={(selected) =>
            (selected as EntryStatuses[])
              .map((value) => {
                const statusOption = statusOptions.find((option) => option.value === value)
                return statusOption ? statusOption.label : ''
              })
              .join(', ')
          }>
          {statusOptions.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              <Checkbox checked={selectedStatuses.includes(status.value as EntryStatuses)} />
              <ListItemText primary={status.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
