import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import ZonesTableActionsMenu from '../ZonesTableActionsMenu'
import ChipsList from '../ChipsList'
import SearchInput from '../SearchInput'
import { Autocomplete, TextField } from '@mui/material'
import { Column } from '@/interfaces/dataTable'

export default function ZonesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  let sortOptions = ['regular', 'admin']
  let options = sortOptions.map((option) => ({ label: option }))

  const columnsData: Column[] = [
    { key: 'name', title: translate('zones.table.name') },
    { key: 'markers', title: translate('zones.table.markers') },
    { key: 'isFinalZone', title: translate('zones.table.isFinalZone') },
    { key: 'actions', title: translate('zones.table.actions'), minWidth: 50, align: 'right' }
  ]

  const rowData = [
    {
      name: 'Зона 1',
      markers: <ChipsList items={['Гуми', 'Масло', 'Чистачки', 'Филтри', 'Брони']} />,
      isFinalZone: 'Да',
      actions: <ZonesTableActionsMenu />
    },
    {
      name: 'Зона 2',
      markers: <ChipsList items={['Чистачки', 'Брони']} />,
      isFinalZone: 'Не',
      actions: <ZonesTableActionsMenu />
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
