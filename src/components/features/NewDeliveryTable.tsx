import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Column } from '@/interfaces/dataTable'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import SearchInput from './SearchInput'
import ChipsList from './ChipsList'
import PositionedPopper from './Poper'
import { GoodType } from './forms/newDeliveryForm/NewDeliveryStep3Form'
import DeliveriesTableActionsMenu from './DeliveriesTableActionsMenu'

let vendorsNames: string[] = ['Bosch', 'Valeo', 'Dunlop', 'Michelin']
let selectedVendorName = vendorsNames.map((vendorName) => ({ label: vendorName }))

const markers = ['Масло', 'Гуми', 'Чистачки']

export default function NewDeliveryTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const columnsData: Column[] = [
    { key: 'number', title: translate('deliveries.newDeliveryTable.columnsData.number') },
    { key: 'vendorName', title: translate('deliveries.newDeliveryTable.columnsData.vendorName') },
    {
      key: 'deliveryNumber',
      title: translate('deliveries.newDeliveryTable.columnsData.deliveryNumber')
    },
    {
      key: 'receptionNumber',
      title: translate('deliveries.newDeliveryTable.columnsData.receptionNumber')
    },
    {
      key: 'waitingGoods',
      title: translate('deliveries.newDeliveryTable.columnsData.waitingGoods')
    },
    {
      key: 'completedGoods',
      title: translate('deliveries.newDeliveryTable.columnsData.completedGoods')
    },
    { key: 'markers', title: translate('deliveries.newDeliveryTable.columnsData.markers') },
    { key: 'status', title: translate('deliveries.newDeliveryTable.columnsData.status') },
    { key: 'approvedOn', title: translate('deliveries.newDeliveryTable.columnsData.approvedOn') },
    { key: 'createdOn', title: translate('deliveries.newDeliveryTable.columnsData.createdOn') },
    { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
  ]

  const goodTypes = [
    { title: translate('newDelivery.goodType.pallets'), value: GoodType.pallets, quantity: 1 },
    { title: translate('newDelivery.goodType.packages'), value: GoodType.packages, quantity: 2 },
    { title: translate('newDelivery.goodType.pieces'), value: GoodType.pieces, quantity: 3 }
  ]

  const rowData = [
    {
      number: 1,
      vendorName: 'Bosch',
      deliveryNumber: 1,
      receptionNumber: 1,
      waitingGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Изчакване']} color="default" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      actions: <DeliveriesTableActionsMenu />
    },
    {
      number: 2,
      vendorName: 'Valeo',
      deliveryNumber: 2,
      receptionNumber: 2,
      waitingGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>2</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Обработва се']} color="warning" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      actions: <DeliveriesTableActionsMenu />
    },
    {
      number: 3,
      vendorName: 'Dunlop',
      deliveryNumber: 3,
      receptionNumber: 3,
      waitingGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>3</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Одобрена']} color="success" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      actions: <DeliveriesTableActionsMenu />
    },
    {
      number: 4,
      vendorName: 'Michelin',
      deliveryNumber: 4,
      receptionNumber: 4,
      waitingGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>4</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <PositionedPopper goodTypes={goodTypes} />
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Приключена']} color="info" />,
      approvedOn: '01.02.2024',
      createdOn: '01.02.2024',
      actions: <DeliveriesTableActionsMenu />
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
        placeholder={translate('deliveries.filters.search')}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={markers}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('deliveries.filters.markers')} />
        )}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={selectedVendorName}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('deliveries.filters.vendorName')} />
        )}
      />
    </DataTable>
  )
}
