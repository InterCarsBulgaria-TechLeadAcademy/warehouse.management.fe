import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import SearchInput from './SearchInput'
import ChipsList from './ChipsList'
import { GoodType } from './forms/newDeliveryForm/NewDeliveryStep3Form'
import DeliveriesTableActionsMenu from './actionsMenu/DeliveriesTableActionsMenu'
import { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import InfoPopper from './InfoPoper'
import DeliveryGoodsInfo from './DeliveryGoodsInfo'
import dateHelpers from '@/utils/dateHelpers'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { Column } from '@/interfaces/column'

interface Row {
  number: number
  vendorName: string
  deliveryNumber: number
  receptionNumber: number
  waitingGoods: React.ReactNode
  completedGoods: React.ReactNode
  markers: React.ReactNode
  status: React.ReactNode
  approvedOn: string
  createdOn: string
  actions: React.ReactNode
}

let vendorsNames: string[] = ['Bosch', 'Valeo', 'Dunlop', 'Michelin']
let selectedVendorName = vendorsNames.map((vendorName) => ({ label: vendorName }))

const markers = ['Масло', 'Гуми', 'Чистачки']

export default function DeliveriesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [deliveryStartTime, setDeliveryStartTime] = React.useState<Dayjs | null>(null)
  const [deliveryEndTime, setDeliveryEndTime] = React.useState<Dayjs | null>(null)

  const goodTypes = [
    { title: translate('newDelivery.goodType.pallets'), value: GoodType.pallets, quantity: 1 },
    { title: translate('newDelivery.goodType.packages'), value: GoodType.packages, quantity: 2 },
    { title: translate('newDelivery.goodType.pieces'), value: GoodType.pieces, quantity: 3 }
  ]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const columnsData: Column<Row>[] = [
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

  const rowData: Row[] = [
    {
      number: 1,
      vendorName: 'Bosch',
      deliveryNumber: 1,
      receptionNumber: 1,
      waitingGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Изчакване']} color="default" />,
      approvedOn: dateHelpers('2024-07-04T10:06:12.594Z'),
      createdOn: dateHelpers('2024-07-04T10:06:12.594Z'),
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
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Обработва се']} color="warning" />,
      approvedOn: dateHelpers('2024-07-04T10:06:12.594Z'),
      createdOn: dateHelpers('2024-07-04T10:06:12.594Z'),
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
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Одобрена']} color="success" />,
      approvedOn: dateHelpers('2024-07-04T10:06:12.594Z'),
      createdOn: dateHelpers('2024-07-04T10:06:12.594Z'),
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
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>1</Typography>
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper>
        </Box>
      ),
      markers: <ChipsList items={markers} />,
      status: <ChipsList items={['Приключена']} color="info" />,
      approvedOn: dateHelpers('2024-07-04T10:06:12.594Z'),
      createdOn: dateHelpers('2024-07-04T10:06:12.594Z'),
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
        id="markers-filter"
        options={markers}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('deliveries.filters.markers')} />
        )}
      />

      <Autocomplete
        disablePortal
        id="vendorName-filter"
        options={selectedVendorName}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('deliveries.filters.vendorName')} />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={translate('deliveries.filters.deliveryStart')}
          value={deliveryStartTime}
          onChange={(newValue) => setDeliveryStartTime(newValue)}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={translate('deliveries.filters.deliveryEnd')}
          value={deliveryEndTime}
          onChange={(newValue) => setDeliveryEndTime(newValue)}
        />
      </LocalizationProvider>
    </DataTable>
  )
}
