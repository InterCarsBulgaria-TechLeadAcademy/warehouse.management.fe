import React from 'react'
import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Switch } from '@mui/material'
import SearchInput from '../SearchInput'
import { Column } from '@/interfaces/Column.ts'
import BaseFormDialog from '@/components/shared/BaseFormDialog'
import {
  useMoveEntryDialog,
  ZonesTableActions
} from '@/hooks/dialogs/zonesContent/useMoveEntryDialog'
import MoveEntryForm from '../forms/MoveEntryForm'
import TableActionsMenu from '../actionsMenu/TableActionsMenu'
import ZonesContentTableActionsMenu from '../actionsMenu/ZonesContentActionsMenu'

interface Row {
  entryNumber: number
  vendorName: string
  receptionNumbers: number
  quantity: number
  status: string
  actions?: React.ReactNode
}

export default function ZonesContentTable() {
  const { t: translate } = useTranslation()
  const [toggleOn, setToggleOn] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  const { quantity, openMoveEntryDialog, onCloseMoveEntryDialog, onOpenMoveEntryDialog } =
    useMoveEntryDialog()

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleOn(event.target.checked)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const columnsData: Column<Row>[] = [
    { key: 'entryNumber', title: translate('zonesContent.table.columns.entryNumber') },
    { key: 'receptionNumbers', title: translate('zonesContent.table.columns.receptionNumbers') },
    { key: 'quantity', title: translate('zonesContent.table.columns.numberOfGoods') },
    { key: 'status', title: translate('zonesContent.table.columns.status') },
    {
      key: 'actions',
      title: translate('zonesContent.table.columns.actions'),
      minWidth: 50,
      align: 'right'
    }
  ]

  const rowData: Row[] = [
    {
      entryNumber: 1,
      vendorName: 'truck',
      receptionNumbers: 12,
      quantity: 33,
      status: 'finished'
      // actions:
    },
    {
      entryNumber: 2,
      vendorName: 'truck',
      receptionNumbers: 11,
      quantity: 52,
      status: 'processing'
      // actions:
    }
  ]

  const tableRowDataWithActions = rowData.map((row) => {
    return {
      ...row,
      actions: (
        <TableActionsMenu
          specificOptionHandler={(action: string) => onOpenMoveEntryDialog(action, row.quantity)}
          options={[
            {
              title: `zonesContent.table.actionsMenu.${ZonesTableActions.MoveToNewZone}`,
              value: ZonesTableActions.MoveToNewZone
            },
            {
              title: `zonesContent.table.actionsMenu.${ZonesTableActions.StartProcessing}`,
              value: ZonesTableActions.StartProcessing
            },
            {
              title: `zonesContent.table.actionsMenu.${ZonesTableActions.FinishProcessing}`,
              value: ZonesTableActions.FinishProcessing
            },
            {
              title: `zonesContent.table.actionsMenu.${ZonesTableActions.DeliveryDetails}`,
              value: ZonesTableActions.DeliveryDetails
            }
          ]}
        />
      )
    }
  })

  const filteredRows = tableRowDataWithActions.filter((row: Row) => {
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
        placeholder={translate('zonesContent.filters.search')}
      />

      <FormControlLabel
        value="start"
        control={<Switch color="primary" onChange={handleToggleChange} />}
        label={translate('zonesContent.filters.toggle')}
        labelPlacement="start"
      />

      <BaseFormDialog
        open={openMoveEntryDialog}
        onCloseDialog={onCloseMoveEntryDialog}
        title={translate('zonesContent.labels.moveEntry')}
        renderForm={(handleCloseForm) => (
          <MoveEntryForm handleCloseForm={handleCloseForm} quantity={quantity} />
        )}
      />
    </DataTable>
  )
}
