import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField } from '@mui/material'
import { Column } from '@/interfaces/Column.ts'
import { VendorDto } from '@/services/model'
import ChipsList from '../ChipsList'
import VendorTableActionsMenu from '@/components/features/actionsMenu/VendorTableActionsMenu.tsx'
import useGetVendors from '@/hooks/services/vendors/useGetVendors'

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
  const vendors = useGetVendors()

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

  const sortOptions = ['regular', 'admin']
  const options = sortOptions.map((option) => ({ label: option }))

  const columnsData: Column<Row>[] = [
    { key: 'name', title: translate('vendors.table.columns.name') },
    { key: 'vendorNumber', title: translate('vendors.table.columns.vendorNumber') },
    { key: 'markers', title: translate('vendors.table.columns.markers') },
    {
      key: 'actions',
      title: translate('vendors.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(vendors: VendorDto[]): Row[] {
    return vendors.map((vendor: VendorDto) => ({
      id: vendor.id!,
      name: vendor.name!,
      vendorNumber: vendor.systemNumber!,
      markers: <ChipsList items={vendor.markers || ([] as string[])} />,
      actions: <VendorTableActionsMenu key={vendor.id} vendor={vendor} />
    }))
  }

  const rowData = transformDataToRows(vendors || [])

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

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('vendors.filters.role')} />
        )}
      />
    </DataTable>
  )
}
