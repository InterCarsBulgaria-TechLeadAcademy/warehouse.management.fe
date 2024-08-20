import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import { Column } from '@/interfaces/Column.ts'
import useTranslateDeliveryHistoryChanges from '@/hooks/useTranslateDeliveryHistoryChanges'
import useTranslateDeliveryHistoryChangeType from '@/hooks/useTranslateDeliveryHistoryChangeType'
import useGetDeliveryHistory from '@/hooks/services/deliveries/useGetDeliveryHistory'
import { Change } from '@/services/model'
import { formatDate } from '@/utils/dateHelpers.ts'

interface DeliveryHistoryTableProps {
  deliveryId: number
}

interface Row {
  id: number
  changed: string
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

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const onRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const columnsData: Column<Row>[] = [
    {
      key: 'changed',
      title: translate('deliveries.table.actions.details.step5.table.table-head.changed')
    },
    {
      key: 'typeChange',
      title: translate('deliveries.table.actions.details.step5.table.table-head.typeChange')
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

  function transformDataToRows(deliveriesHistory: Change[]): Row[] {
    return deliveriesHistory.map((deliveryHistory: Change, index: number) => ({
      id: index,
      changed: useTranslateDeliveryHistoryChanges(deliveryHistory.propertyName!),
      typeChange: useTranslateDeliveryHistoryChangeType(deliveryHistory.type!),
      from: formatDate(deliveryHistory.from!),
      to: formatDate(deliveryHistory.to!),
      dataChange: formatDate(deliveryHistory.from!)
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
