import React from 'react'
import { useTranslation } from 'react-i18next'
import { DifferenceDto } from '@/services/model'
import TableActionsMenu from './TableActionsMenu'
import ConfirmDialog from '../../shared/ConfirmDialog.tsx'
import BaseFormDialog from '@/components/shared/BaseFormDialog.tsx'
import AdminCommentForm from '../forms/AdminCommentForm.tsx'
import { useStartProcessingDifference } from '@/hooks/services/differences/useStartProcessingDifference.ts'

interface DifferencesTableActionsMenuProps {
  difference: DifferenceDto
}

export default function DifferencesTableActionsMenu({
  difference
}: DifferencesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const differenceStartProcessing = useStartProcessingDifference()

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  function handleStartProcessing() {
    differenceStartProcessing.mutate(difference.id!)
    handleClose()
  }

  const options = (() => {
    const options = []
    const availableOptions = {
      startProcessing: {
        title: 'differences.table.actionsMenu.startProcessing',
        value: 'startProcessing'
      },
      finishProcessing: {
        title: 'differences.table.actionsMenu.finishProcessing',
        value: 'finishProcessing'
      },
      noDifferences: {
        title: 'differences.table.actionsMenu.no-differences',
        value: 'noDifferences'
      }
    }

    switch (difference.status) {
      case 'Waiting':
        options.push(availableOptions.startProcessing)
        break

      case 'Processing':
        options.push(availableOptions.finishProcessing, availableOptions.noDifferences)
        break
    }

    return options.length > 0
      ? options
      : [{ title: 'differences.table.actionsMenu.noActions', value: '' }]
  })()

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'startProcessing' && (
        <ConfirmDialog
          open={true}
          discardText={translate('differences.table.actions.startProcessing.labels.discard')}
          confirmText={translate('differences.table.actions.startProcessing.labels.confirm')}
          title={translate('differences.table.actions.startProcessing.title')}
          content={translate('differences.table.actions.startProcessing.message', {
            differenceNumber: difference.id!
          })}
          onConfirmClick={handleStartProcessing}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
        />
      )}

      {selectedOption === 'finishProcessing' && (
        <BaseFormDialog
          open={true}
          onCloseDialog={handleClose}
          title={translate('differences.table.actions.finishProcessing.title')}
          renderForm={(handleCloseForm) => (
            <AdminCommentForm
              handleCloseForm={handleCloseForm}
              difference={difference}
              action="finishProcessing"
            />
          )}
        />
      )}

      {selectedOption === 'noDifferences' && (
        <BaseFormDialog
          open={true}
          onCloseDialog={handleClose}
          title={translate('differences.table.actions.noDifferences.title')}
          renderForm={(handleCloseForm) => (
            <AdminCommentForm
              handleCloseForm={handleCloseForm}
              difference={difference}
              action="noDifferences"
            />
          )}
        />
      )}
    </div>
  )
}
