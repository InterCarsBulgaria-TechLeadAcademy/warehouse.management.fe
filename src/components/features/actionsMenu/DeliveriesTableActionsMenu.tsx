import React from 'react'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from './TableActionsMenu'
import DeliveryDetails from '../DeliveryDetails'
import useDeleteDelivery from '@/hooks/services/deliveries/useDeleteDelivery'
import ConfirmDialog from '../../shared/ConfirmDialog.tsx'
import { useApproveDelivery } from '@/hooks/services/deliveries/useApproveDelivery.ts'
import { DeliveryDto } from '@/services/model/deliveryDto.ts'

interface DeliveriesTableActionsMenuProps {
  delivery: DeliveryDto
}

export default function DeliveriesTableActionsMenu({ delivery }: DeliveriesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationDelete = useDeleteDelivery()
  const approveDelivery = useApproveDelivery()

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const onConfirmApprove = () => {
    approveDelivery.mutate(delivery.id!)
    handleClose()
  }

  const onConfirmDelete = () => {
    mutationDelete.mutate(delivery.id!)
    handleClose()
  }

  const options = (() => {
    const availableOptions = {
      details: {
        title: 'deliveries.table.actionsMenu.details',
        value: 'details'
      },
      approve: {
        title: 'deliveries.table.actionsMenu.approve',
        value: 'approve'
      },
      delete: {
        title: 'deliveries.table.actionsMenu.delete',
        value: 'delete'
      }
    }

    const options = [availableOptions.details, availableOptions.delete]

    switch (delivery.status) {
      case 'Finished':
        options.push(availableOptions.approve)
        break
    }

    return options
  })()

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'details' && (
        <ConfirmDialog
          open={true}
          maxWidth="md"
          content={<DeliveryDetails deliveryId={delivery.id!} />}
          discardText={translate('deliveries.table.actions.details.labels.exit')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
        />
      )}

      {selectedOption === 'approve' && (
        <ConfirmDialog
          open={true}
          title={translate('deliveries.table.actions.approve.title')}
          content={translate('deliveries.table.actions.approve.message', {
            deliveryNumber: delivery.id!
          })}
          discardText={translate('deliveries.table.actions.approve.labels.discard')}
          confirmText={translate('deliveries.table.actions.approve.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmApprove}
        />
      )}

      {/* TODO: Only admin action */}
      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('deliveries.table.actions.delete.title')}
          content={translate('deliveries.table.actions.delete.message', {
            deliveryNumber: delivery.id!
          })}
          discardText={translate('deliveries.table.actions.delete.labels.discard')}
          confirmText={translate('deliveries.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmDelete}
        />
      )}
    </div>
  )
}
