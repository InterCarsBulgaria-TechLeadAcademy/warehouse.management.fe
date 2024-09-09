import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import { Column } from '@/interfaces/Column.ts'
import useGetDeliveryHistory from '@/hooks/services/deliveries/useGetDeliveryHistory'
import { DeliveryChangeDto } from '@/services/model'
import { formatDate } from '@/utils/dateHelpers.ts'
import { useDeliveryHistory } from '@/hooks/useDeliveryHistory.ts'

interface DeliveryHistoryTableProps {
  deliveryId: number
}

interface Row {
  id: number
  changed: string
  entityId: string | number
  typeChange: string
  from: string | React.ReactNode
  to: string | React.ReactNode
  dataChange: string | React.ReactNode
}

export default function DeliveryHistoryTable({ deliveryId }: DeliveryHistoryTableProps) {
  const { t: translate } = useTranslation()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const deliveriesHistory = useGetDeliveryHistory(deliveryId)
  const { translateChangeType, translatePropertyName, formatDeliveryChangeValue } =
    useDeliveryHistory()

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const columnsData: Column<Row>[] = [
    {
      key: 'typeChange',
      title: translate('deliveries.table.actions.details.step5.table.table-head.typeChange')
    },
    {
      key: 'entityId',
      title: translate('deliveries.table.actions.details.step5.table.table-head.entityId')
    },
    {
      key: 'changed',
      title: translate('deliveries.table.actions.details.step5.table.table-head.changed')
    },
    {
      key: 'from',
      title: translate('deliveries.table.actions.details.step5.table.table-head.from')
    },
    { key: 'to', title: translate('deliveries.table.actions.details.step5.table.table-head.to') },
    {
      key: 'dataChange',
      title: translate('deliveries.table.actions.details.step5.table.table-head.dataChange')
    }
  ]

  function transformDataToRows(deliveriesHistory: DeliveryChangeDto[]): Row[] {
    return deliveriesHistory.map((deliveryHistory: DeliveryChangeDto, index: number) => ({
      id: index,
      entityId: deliveryHistory.entityId!,
      changed: translatePropertyName(deliveryHistory.logType!, deliveryHistory.propertyName!),
      typeChange: translateChangeType(deliveryHistory.type!),
      from: formatDeliveryChangeValue(deliveryHistory.from, deliveryHistory.propertyName!),
      to: formatDeliveryChangeValue(deliveryHistory.to, deliveryHistory.propertyName!),
      dataChange: formatDate(deliveryHistory.changeDate!)
    }))
  }

  const rowData = transformDataToRows(deliveriesHistory.changes! || [])

  return (
    <DataTable
      columnsData={columnsData}
      rowData={rowData}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  )
}
