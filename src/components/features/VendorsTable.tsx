import ActionsMenu from '@/components/features/ActionsMenu'
import DataTable from '@/components/shared/DataTable'
import WarningActionDialog from '../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function VendorsTable() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const onConfirmClick = () => {
    handleClose()
  }

  return (
    <DataTable
      hasSearchInput={true}
      isSortTextField={true}
      sortLabel={translate('vendors.labels.role')}
      sortOptionsData={['Proba1', 'Proba2']}
      columnsData={[
        { key: 'name', title: translate('vendors.table.name') },
        { key: 'vendorNumber', title: translate('vendors.table.vendorNumber') },
        { key: 'markers', title: translate('vendors.table.markers') },
        { key: 'actions', title: translate('vendors.table.actions'), minWidth: 50, align: 'right' }
      ]}
      rowData={[
        {
          name: 'Bosch',
          vendorNumber: 1,
          markers: 'Масло',
          actions: (
            <ActionsMenu
              actions={[
                {
                  label: translate('actionsMenu.options.delete'),
                  component: (
                    <WarningActionDialog
                      open={openDialog}
                      title={translate('deleteAction.title')}
                      content={translate('deleteAction.message')}
                      discardText={translate('deleteAction.labels.discard')}
                      confirmText={translate('deleteAction.labels.confirm')}
                      onCloseDialog={handleClose}
                      onDiscardClick={onDiscardClick}
                      onConfirmClick={onConfirmClick}
                    />
                  )
                }
              ]}
              handleClickOpen={handleClickOpen}
            />
          )
        }
        // ,
        // {
        //   name: 'Valeo',
        //   vendorNumber: 2,
        //   markers: 'Чистачки',
        //   actions: <ActionsMenu actions={[{ label: translate('actionsMenu.options.delete') }]} />
        // }
      ]}
    />
  )
}

// const options = [translate('actionsMenu.options.edit'), translate('actionsMenu.options.delete')]
