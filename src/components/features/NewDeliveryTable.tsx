import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Column } from '@/interfaces/dataTable'
import { Autocomplete, TextField } from '@mui/material'
import SearchInput from './SearchInput'
import VendorTableActionsMenu from './VendorTableActionsMenu'
import ChipsList from './ChipsList'
import PositionedPopper from './Poper'

export default function NewDeliveryTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  let sortOptions = ['regular', 'admin']
  let options = sortOptions.map((option) => ({ label: option }))

  const columnsData: Column[] = [
    // { key: 'name', title: translate('vendors.table.name') },
    // { key: 'vendorNumber', title: translate('vendors.table.vendorNumber') },
    // { key: 'markers', title: translate('vendors.table.markers') },
    // { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
    { key: 'number', title: 'Номер' },
    { key: 'vendorName', title: 'Доставчик' },
    { key: 'deliveryNumber', title: 'Номер(а) на доставка' },
    { key: 'receptionNumber', title: 'Номер(а) на рецепция' },
    { key: 'waitingGoods', title: 'Стока чакаща обработка' },
    { key: 'completedGoods', title: 'Стока завършила обработка' },
    { key: 'status', title: 'Статус' },
    { key: 'approvedOn', title: 'Одобрена на' },
    { key: 'createdOn', title: 'Създадена на' },
    { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
  ]

  const rowData = [
    {
      number: 1,
      vendorName: 'Bosch',
      deliveryNumber: 1,
      receptionNumber: 1,
      waitingGoods: <PositionedPopper />,
      completedGoods: 0,
      status: <ChipsList items={['Изчакване']} color="default" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      //   example action
      actions: <VendorTableActionsMenu />
    },
    {
      number: 2,
      vendorName: 'Valeo',
      deliveryNumber: 2,
      receptionNumber: 2,
      waitingGoods: 2,
      completedGoods: 1,
      status: <ChipsList items={['Обработва се']} color="warning" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      //   example action
      actions: <VendorTableActionsMenu />
    },
    {
      number: 3,
      vendorName: 'Dunlop',
      deliveryNumber: 3,
      receptionNumber: 3,
      waitingGoods: 3,
      completedGoods: 2,
      status: <ChipsList items={['Одобрена']} color="success" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      //   example action
      actions: <VendorTableActionsMenu />
    },
    {
      number: 4,
      vendorName: 'Michelin',
      deliveryNumber: 4,
      receptionNumber: 4,
      waitingGoods: 4,
      completedGoods: 3,
      status: <ChipsList items={['Приключена']} color="info" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      //   example action
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
