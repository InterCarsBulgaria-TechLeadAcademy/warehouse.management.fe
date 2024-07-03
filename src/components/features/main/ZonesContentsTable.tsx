import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Switch } from '@mui/material'
import TableActionsMenu from '@/components/shared/TableActionsMenu'
import SearchInput from '../SearchInput'

interface Row {
  entryNumber: number
  vendorName: string
  receptionNumbers: number
  numberOfGoods: number
  status: string
  actions: React.ReactNode
}

export default function ZonesContentsTable() {
  const { t: translate } = useTranslation()
  const [toggleOn, setToggleOn] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleOn(event.target.checked)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const columnsData: Column<Row>[] = [
    { key: 'entryNumber', title: translate('zonesContent.table.entryNumber') },
    { key: 'vendorName', title: translate('zonesContent.table.vendorName') },
    { key: 'receptionNumbers', title: translate('zonesContent.table.receptionNumbers') },
    { key: 'numberOfGoods', title: translate('zonesContent.table.numberOfGoods') },
    { key: 'status', title: translate('zonesContent.table.status') },
    { key: 'actions', title: translate('zonesContent.table.actions'), minWidth: 50, align: 'right' }
  ]

  const rowData: Row[] = [
    {
      entryNumber: 1,
      vendorName: 'truck',
      receptionNumbers: 12,
      numberOfGoods: 33,
      status: 'finished',
      actions: (
        <TableActionsMenu
          itemProps={['MoveToNewZone', 'StartProcessing', 'FinishProcessing', 'DeliveryDetails']}
          page="zones"
        />
      )
    },
    {
      entryNumber: 2,
      vendorName: 'truck',
      receptionNumbers: 11,
      numberOfGoods: 52,
      status: 'processing',
      actions: (
        <TableActionsMenu
          itemProps={['MoveToNewZone', 'StartProcessing', 'FinishProcessing', 'DeliveryDetails']}
          page="zones"
        />
      )
    }
  ]

  const filteredRows = rowData.filter((row: Row) => {
    if (toggleOn) {
      return columnsData.some((column: Column<Row>) => {
        return row[column.key]?.toString().toLowerCase().includes('finished')
      })
    } else {
      return columnsData.some((column) => {
        return row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    }
  })

  return (
    <DataTable columnsData={columnsData} rowData={filteredRows}>
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
