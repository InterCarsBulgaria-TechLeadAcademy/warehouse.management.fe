import VendorTableActionsMenu from '@/components/features/VendorTableActionsMenu'
import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField } from '@mui/material'
import { Column } from '@/interfaces/column.ts'

interface Row {
  name: string
  vendorNumber: number
  markers: string
  actions: React.ReactNode
}

export default function VendorsTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const sortOptions = ['regular', 'admin']
  const options = sortOptions.map((option) => ({ label: option }))

  const columnsData: Column<Row>[] = [
    { key: 'name', title: translate('vendors.table.name') },
    { key: 'vendorNumber', title: translate('vendors.table.vendorNumber') },
    { key: 'markers', title: translate('vendors.table.markers') },
    { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
  ]

  const rowData: Row[] = [
    {
      name: 'Bosch',
      vendorNumber: 1,
      markers: 'Масло',
      actions: <VendorTableActionsMenu />
    },
    {
      name: 'Valeo',
      vendorNumber: 2,
      markers: 'Чистачки',
      actions: <VendorTableActionsMenu />
    }
  ]

  const filteredRows = rowData.filter((row: Row) => {
    return columnsData.some((column: Column<Row>) => {
      return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  return (
    <DataTable columnsData={columnsData} rowData={filteredRows}>
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
