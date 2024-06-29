import React from 'react'

import DataTable from '@/components/shared/DataTable'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from '../shared/TableActionsMenu'
import { FormControlLabel, Switch } from '@mui/material'
import { Column } from '@/interfaces/dataTable'
import SearchInput from './SearchInput'
import FormDialog from '../shared/FormDialog'
import { useMoveEntryDialog } from '@/hooks/dialogs/useMoveEntryDialog'
import MoveEntryForm from '@/utils/forms/MoveEntryForm'
import { MoveEntryFormData, moveEntrySchema } from '@/schemas/moveEntrySchema'
import { ZonesTableActions } from '@/hooks/dialogs/useMoveEntryDialog'
import DialogForm from '../shared/DialogForm'

export default function ZonesTable() {
  const { t: translate } = useTranslation()
  const [toggleOn, setToggleOn] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  
  const {
    quantity,
    openMoveEntryDialog,
    onCloseMoveEntryDialog,
    handleMoveEntryDialog,
    onOpenMoveEntryDialog
  } = useMoveEntryDialog();
  

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
    },
    {
      entryNumber: 2,
      vendorName: 'truck',
      receptionNumbers: 11,
      numberOfGoods: 52,
      status: 'processing',
    }
  ]

  const tableRowDataWithActions = rowData.map((row) => {
    return {
      ...row,
      actions: (
        <TableActionsMenu
          specificOptionHandler={(action: string) => onOpenMoveEntryDialog(action, row.numberOfGoods)}
          itemProps={[ZonesTableActions.MoveToNewZone, 'StartProcessing', 'FinishProcessing', 'DeliveryDetails']}
          page='zones'
        />
      )
    }
  })

  const filteredRows = tableRowDataWithActions.filter((row: any) => {
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

      <FormDialog<MoveEntryFormData>
        open={openMoveEntryDialog}
        title={translate('zones.moveEntry.title')}
        discardText={translate('newZone.labels.exit')}
        confirmText={translate('zones.moveEntry.confirm')}
        onCloseDialog={onCloseMoveEntryDialog}
        schema={moveEntrySchema}
        onSubmit={handleMoveEntryDialog}
        renderForm={(methods) => <MoveEntryForm methods={methods} quantity={quantity} />}
        extraProps={{ quantity }}
      />

      <DialogForm
        open={false}
        title={translate('zones.moveEntry.title')}
      >
        {/* <MoveEntryForm /> */}
      </DialogForm>
    </DataTable>
  )
}
