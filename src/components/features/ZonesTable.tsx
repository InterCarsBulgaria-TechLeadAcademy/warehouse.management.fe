import React from 'react'

import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from '../shared/TableActionsMenu'
import { FormControlLabel, Switch } from '@mui/material'
import { Column } from '@/interfaces/dataTable'
import SearchInput from './SearchInput'

export default function ZonesTable() {
  const { t: translate } = useTranslation()
  const [toggleOn, setToggleOn] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleOn(event.target.checked);
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const columnsData: Column[] = [
    { key: 'entryNumber', title: translate('zones.table.entryNumber') },
    { key: 'vendorName', title: translate('zones.table.vendorName') },
    { key: 'receptionNumbers', title: translate('zones.table.receptionNumbers') },
    { key: 'numberOfGoods', title: translate('zones.table.numberOfGoods') },
    { key: 'status', title: translate('zones.table.status') },
    { key: 'actions', title: translate('markers.table.actions'), minWidth: 50, align: 'right' }
  ]

  const rowData = [
    {
      entryNumber: 1,
      vendorName: 'truck',
      receptionNumbers: 12,
      numberOfGoods: 33,
      status: 'finished',
      actions: <TableActionsMenu itemProps={['MoveToNewZone', 'StartProcessing', 'FinishProcessing', 'DeliveryDetails']} page='zones' />
    },
    {
      entryNumber: 2,
      vendorName: 'truck',
      receptionNumbers: 11,
      numberOfGoods: 52,
      status: 'processing',
      markers: 'Накладки',
      actions: <TableActionsMenu itemProps={['MoveToNewZone', 'StartProcessing', 'FinishProcessing', 'DeliveryDetails']} page='zones' />
    }
  ]

  const filteredRows = rowData.filter((row: any) => {
    if (toggleOn) {
      return columnsData.some((column) => {
        return row[column.key]?.toString().toLowerCase().includes('finished')
      })

    } else {
      return columnsData.some((column) => {
        return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    }
  })

  return (
    <DataTable
      columnsData={columnsData}
      rowData={filteredRows}
    >
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={translate('vendors.labels.search')}
      />

      <FormControlLabel
        value="start"
        control={<Switch color="primary" onChange={handleToggleChange} />}
        label={translate('zones.labels.toggle')}
        labelPlacement="start"
      />
    </DataTable>
  )
}
