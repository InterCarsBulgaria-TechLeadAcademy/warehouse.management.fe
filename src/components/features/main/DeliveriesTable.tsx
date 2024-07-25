import DataTable from '@/components/shared/DataTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import SearchInput from '../SearchInput'
import ChipsList from '../ChipsList'
// import { GoodType } from '../forms/newDeliveryForm/NewDeliveryStep3Form'
import DeliveriesTableActionsMenu from '../actionsMenu/DeliveriesTableActionsMenu'
import { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import InfoPopper from '../InfoPoper'
// import DeliveryGoodsInfo from '../DeliveryGoodsInfo'
import dateHelpers from '@/utils/dateHelpers'
import useGetDeliveries from '@/hooks/services/deliveries/useGetDeliveries'
import { DeliveryDto } from '@/services/model'
import useGetMarkers from '@/hooks/services/markers/useGetMarkers'
import { Column } from '@/interfaces/Column'
import useGetVendors from '@/hooks/services/vendors/useGetVendors'

interface Row {
  number: number
  vendorName: string
  systemNumber: string
  receptionNumber: string
  waitingGoods: React.ReactNode
  completedGoods: React.ReactNode
  markers: React.ReactNode
  status: React.ReactNode
  approvedOn: string
  createdOn: string
  actions: React.ReactNode
}

export default function DeliveriesTable() {
  const { t: translate } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [deliveryStartTime, setDeliveryStartTime] = React.useState<Dayjs | null>(null)
  const [deliveryEndTime, setDeliveryEndTime] = React.useState<Dayjs | null>(null)
  const markers = useGetMarkers()
  const vendors = useGetVendors()
  const deliveries = useGetDeliveries(page, rowsPerPage, searchTerm)

  const markersName = markers.map((marker) => marker.name!)
  const vendorsName = vendors.map((vendor) => vendor.name!)

  // const goodTypes = [
  //   {
  //     title: translate('deliveries.newDelivery.goodType.pallets'),
  //     value: GoodType.pallets,
  //     quantity: 1
  //   },
  //   {
  //     title: translate('deliveries.newDelivery.goodType.packages'),
  //     value: GoodType.packages,
  //     quantity: 2
  //   },
  //   {
  //     title: translate('deliveries.newDelivery.goodType.pieces'),
  //     value: GoodType.pieces,
  //     quantity: 3
  //   }
  // ]

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
    { key: 'number', title: translate('deliveries.table.columns.number') },
    { key: 'vendorName', title: translate('deliveries.table.columns.vendorName') },
    {
      key: 'systemNumber',
      title: translate('deliveries.table.columns.deliveryNumber')
    },
    {
      key: 'receptionNumber',
      title: translate('deliveries.table.columns.receptionNumber')
    },
    {
      key: 'waitingGoods',
      title: translate('deliveries.table.columns.waitingGoods')
    },
    {
      key: 'completedGoods',
      title: translate('deliveries.table.columns.completedGoods')
    },
    { key: 'markers', title: translate('deliveries.table.columns.markers') },
    { key: 'status', title: translate('deliveries.table.columns.status') },
    { key: 'approvedOn', title: translate('deliveries.table.columns.approvedOn') },
    { key: 'createdOn', title: translate('deliveries.table.columns.createdOn') },
    {
      key: 'actions',
      title: translate('deliveries.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  function transformDataToRows(deliveries: DeliveryDto[]): Row[] {
    return deliveries.map((delivery: DeliveryDto) => ({
      id: delivery.id!,
      number: delivery.id!,
      vendorName: delivery.vendorName!,
      systemNumber: delivery.systemNumber!,
      receptionNumber: delivery.receptionNumber!,
      waitingGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{delivery.entriesWaitingProcessing!}</Typography>
          {/* TODO: БЕ трябва да го направят като функционалност 
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} /> 
          </InfoPopper> */}
        </Box>
      ),
      completedGoods: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{delivery.entriesFinishedProcessing}</Typography>
          {/* TODO: БЕ трябва да го направят като функционалност
          <InfoPopper>
            <DeliveryGoodsInfo goodTypes={goodTypes} />
          </InfoPopper> */}
        </Box>
      ),
      markers:
        delivery.markers!.length === 0 ? (
          <Typography>-</Typography>
        ) : (
          <ChipsList items={delivery.markers!.map((marker) => marker.markerName!)} />
        ),
      status: <ChipsList items={[delivery.status!]} />,
      approvedOn: delivery.approvedOn!,
      // да го оправя след като БЕ го оправят и да изтрия dateHelpers util
      createdOn: dateHelpers('2024-07-04T10:06:12.594Z'),
      actions: <DeliveriesTableActionsMenu deliveryId={delivery.id!} />
    }))
  }

  const rowData = transformDataToRows(deliveries.results! || [])

  const filteredRows = rowData.filter((row: any) => {
    return columnsData.some((column) => {
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
        placeholder={translate('deliveries.filters.search')}
      />

      <Autocomplete
        disablePortal
        id="markers-filter"
        options={markersName}
        onChange={(_event, newValue) => {
          //TODO: BE must make logic to can put get request
          console.log(newValue)
        }}
        size="small"
        sx={{ width: '235px' }}
        renderInput={(params) => (
          <TextField {...params} label={translate('deliveries.filters.markers')} />
        )}
      />

      <Autocomplete
        disablePortal
        id="vendorName-filter"
        options={vendorsName}
        onChange={(_event, newValue) => {
          //TODO: BE must make logic to can put get request
          console.log(newValue)
        }}
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
