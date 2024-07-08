import VendorTableActionsMenu from '@/components/features/VendorTableActionsMenu'
import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Column } from '@/interfaces/DataTable'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField } from '@mui/material'

export default function VendorsTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  let sortOptions = ['regular', 'admin']
  let options = sortOptions.map((option) => ({ label: option }))

  const columnsData: Column[] = [
    { key: 'name', title: translate('vendors.table.name') },
    { key: 'vendorNumber', title: translate('vendors.table.vendorNumber') },
    { key: 'markers', title: translate('vendors.table.markers') },
    { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
  ]

  const rowData = [
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

  const filteredRows = rowData.filter((row: any) => {
    return columnsData.some((column) => {
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
