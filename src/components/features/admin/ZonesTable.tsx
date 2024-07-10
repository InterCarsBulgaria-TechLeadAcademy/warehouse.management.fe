import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField } from '@mui/material'
import { Column } from '@/interfaces/Column.ts'
import ZonesTableActionsMenu from '../actionsMenu/ZonesTableActionsMenu'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { ZoneDto } from '@/services/model'

interface Row {
  name: string
  markers: React.ReactNode
  isFinal: boolean
  actions: React.ReactNode
}

export default function ZonesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

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
    { key: 'name', title: translate('zones.table.name') },
    { key: 'markers', title: translate('zones.table.markers') },
    { key: 'isFinalZone', title: translate('zones.table.isFinalZone') },
    { key: 'actions', title: translate('zones.table.actions'), minWidth: 50, align: 'right' }
  ]

  // const rowData: Row[] = [
  //   {
  //     name: 'Зона 1',
  //     markers: <ChipsList items={['Гуми', 'Масло', 'Чистачки', 'Филтри', 'Брони']} />,
  //     isFinalZone: 'Да',
  //     actions: <ZonesTableActionsMenu />
  //   },
  //   {
  //     name: 'Зона 2',
  //     markers: <ChipsList items={['Чистачки', 'Брони']} />,
  //     isFinalZone: 'Не',
  //     actions: <ZonesTableActionsMenu />
  //   }
  // ]

  const { data } = useSuspenseQuery({
    queryKey: ['zones'],
    queryFn: () => {
      // return getWarehouseManagementApi().getApiZoneAll({
      //   PageNumber: page + 1,
      //   PageSize: rowsPerPage,
      //   SearchQuery: searchTerm
      // })
      return getWarehouseManagementApi().getApiZoneAll()
    }
  })

  function transformDataToRows(zones: ZoneDto[]) {
    return zones.map((zone: ZoneDto) => ({
      id: zone.id!,
      name: zone.name!,
      markers: zone.markers,
      isFinal: zone.isFinal,
      actions: (
        <ZonesTableActionsMenu
          key={zone.id}
          id={zone.id!}
          name={zone.name!}
          markers={zone.markers}
          isFinal={zone.isFinal}
        />
      )
    }))
  }

  const rowData = transformDataToRows(data || [])

  console.log(data)

  //като му добавя isFinalZone ще се оправи
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
        placeholder={translate('zones.labels.search')}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => <TextField {...params} label={translate('zones.labels.role')} />}
      />
    </DataTable>
  )
}
