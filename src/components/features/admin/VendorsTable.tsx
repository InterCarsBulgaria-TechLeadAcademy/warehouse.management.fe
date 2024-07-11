import VendorTableActionsMenu from '@/components/features/VendorTableActionsMenu'
import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { Column } from '@/interfaces/column'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { VendorDto } from '@/services/model'
import ChipsList from '../ChipsList'

interface Row {
  id: number
  name: string
  vendorNumber: string
  markers: React.ReactNode
  actions: React.ReactNode
}

export default function VendorsTable() {
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
    { key: 'name', title: translate('vendors.table.name') },
    { key: 'vendorNumber', title: translate('vendors.table.vendorNumber') },
    { key: 'markers', title: translate('vendors.table.markers') },
    { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
  ]

  //TODO: Като направят БЕ pagination го оправи
  const { data } = useSuspenseQuery({
    queryKey: ['vendors'],
    queryFn: () => {
      // return getWarehouseManagementApi().getApiVendorAll({
      //   PageNumber: page + 1,
      //   PageSize: rowsPerPage,
      //   SearchQuery: searchTerm
      // })
      return getWarehouseManagementApi().getApiVendorAll() //БЕ сега работят по Pagination
    }
  })

  function transformDataToRows(vendors: VendorDto[]): Row[] {
    return vendors.map((vendor: VendorDto) => ({
      id: vendor.id!,
      name: vendor.name!,
      vendorNumber: vendor.systemNumber!,
      markers:
        vendor.markers!.length > 0 ? (
          <ChipsList
            items={vendor.markers?.map((marker) => marker.markerName!) || ([] as string[])}
          />
        ) : (
          <Typography>-</Typography>
        ),
      // actions: <VendorTableActionsMenu key={vendor.id} vendor={vendor} />
      //Подай тези пропс
      actions: (
        <VendorTableActionsMenu
          key={vendor.id}
          id={vendor.id!}
          name={vendor.name!}
          vendorNumber={vendor.systemNumber!}
          markersIds={vendor.markers?.map((marker) => marker.markerId!) || ([] as string[])}
        />
      )
    }))
  }

  const rowData = transformDataToRows(data || [])

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
        placeholder={translate('vendors.labels.search')}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => <TextField {...params} label={translate('vendors.labels.role')} />}
      />
    </DataTable>
  )
}
