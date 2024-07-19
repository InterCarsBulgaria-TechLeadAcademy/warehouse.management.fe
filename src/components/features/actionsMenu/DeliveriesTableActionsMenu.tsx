import React from 'react'
import WarningActionDialog from '../../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'
import TableActionsMenu from './TableActionsMenu'

export default function DeliveriesTableActionsMenu() {
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
    { title: 'actionsMenu.options.details', value: 'details' },
    { title: 'actionsMenu.options.approve', value: 'approve' },
    { title: 'actionsMenu.options.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {/* TODO: Only admin action */}
      {selectedOption === 'delete' && (
        <WarningActionDialog
          open={true}
          title={translate('deliveries.deleteActions.title')}
          content={translate('deliveries.deleteActions.message')}
          discardText={translate('deliveries.deleteActions.labels.discard')}
          confirmText={translate('deliveries.deleteActions.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
