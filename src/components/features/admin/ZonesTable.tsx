import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import ZonesTableActionsMenu from '../actionsMenu/ZonesTableActionsMenu'
import ChipsList from '../ChipsList'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { Column } from '@/interfaces/Column.ts'
import { ZoneDto } from '@/services/model'
import useGetZones from '@/hooks/services/zones/useGetZones'

interface Row {
  id: number
  name: string
  markers: React.ReactNode
  isFinal: string | undefined
  actions: React.ReactNode
}

export default function ZonesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const zones = useGetZones()

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
    { key: 'name', title: translate('zones.table.columns.name') },
    { key: 'markers', title: translate('zones.table.columns.markers') },
    { key: 'isFinal', title: translate('zones.table.columns.isFinal') },
    {
      key: 'actions',
      title: translate('zones.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(zones: ZoneDto[]): Row[] {
    return zones.map((zone: ZoneDto) => ({
      id: zone.id!,
      name: zone.name!,
      markers:
        zone.markers!.length > 0 ? (
          <ChipsList
            items={zone.markers?.map((marker) => marker.markerName!) || ([] as string[])}
          />
        ) : (
          <Typography>-</Typography>
        ),
      isFinal: zone.isFinal
        ? translate('zones.table.rows.isFinal.options.yes')
        : translate('zones.table.rows.isFinal.options.no'),
      actions: <ZonesTableActionsMenu key={zone.id} zone={zone} />
    }))
  }

  const rowData = transformDataToRows(zones || [])

  const filteredRows = rowData.filter((row: Row) => {
    return columnsData.some((column: Column<Row>) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  const sortOptions = ['regular', 'admin']
  const options = sortOptions.map((option) => ({ label: option }))

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
        placeholder={translate('zones.filters.search')}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => <TextField {...params} label={translate('zones.filters.role')} />}
      />
    </DataTable>
  )
}
