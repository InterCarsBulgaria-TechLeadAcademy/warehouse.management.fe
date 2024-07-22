import React from 'react'
import WarningActionDialog from '../../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from './TableActionsMenu'
import DeliveryDetails from '../DeliveryDetails'

export default function DeliveriesTableActionsMenu(deliveryId: number) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const onConfirmClick = () => {
    handleClose()
  }

  const options = [
    { title: 'deliveries.table.actionsMenu.details', value: 'details' },
    { title: 'deliveries.table.actionsMenu.approve', value: 'approve' },
    { title: 'deliveries.table.actionsMenu.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'details' && <DeliveryDetails deliveryId={deliveryId} />}

      {/* TODO: Only admin action */}
      {selectedOption === 'delete' && (
        <WarningActionDialog
          open={true}
          title={translate('deliveries.table.actions.delete.title')}
          content={translate('deliveries.table.actions.delete.message')}
          discardText={translate('deliveries.table.actions.delete.discard')}
          confirmText={translate('deliveries.table.actions.delete.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
