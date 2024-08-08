import React from 'react'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from './TableActionsMenu'
import DeliveryDetails from '../DeliveryDetails'
import useDeleteDelivery from '@/hooks/services/deliveries/useDeleteDelivery'
import ConfirmDialog from '../../shared/ConfirmDialog.tsx'

interface DeliveriesTableActionsMenuProps {
  deliveryId: number
}

export default function DeliveriesTableActionsMenu({
  deliveryId
}: DeliveriesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationDelete = useDeleteDelivery()

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
    mutationDelete.mutate(deliveryId)
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

      {selectedOption === 'details' && (
        <ConfirmDialog
          open={true}
          content={<DeliveryDetails deliveryId={deliveryId} />}
          discardText={translate('deliveries.table.actions.details.labels.exit')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
        />
      )}

      {/* TODO: Only admin action */}
      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('deliveries.table.actions.delete.title')}
          content={translate('deliveries.table.actions.delete.message')}
          discardText={translate('deliveries.table.actions.delete.labels.discard')}
          confirmText={translate('deliveries.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
