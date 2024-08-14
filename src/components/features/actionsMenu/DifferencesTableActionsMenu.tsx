import React from 'react'
import { useTranslation } from 'react-i18next'
import { DifferenceDto } from '@/services/model'
import TableActionsMenu from './TableActionsMenu'
import ConfirmDialog from '../../shared/ConfirmDialog.tsx'
import { useDifferenceStartProcessing } from '@/hooks/services/differences/useDifferenceStartProcessing.ts'

interface DifferencesTableActionsMenuProps {
  difference: DifferenceDto
}

export default function DifferencesTableActionsMenu({
  difference
}: DifferencesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const differenceStartProcessing = useDifferenceStartProcessing()
  // const differenceFinishProcessing = useDifferenceFinishProcessing()

  console.log(difference)

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
    // differenceStartProcessing.mutate()
    handleClose()
  }

  function handleFinishProcessing() {
    // entryFinishProcessing.mutate(entry.id!)
    handleClose()
  }

  // TODO: в зависимост от статуса трябва да се показват различни options на отделните редове
  // const options = [
  //   { title: 'differences.table.actionsMenu.startProcessing', value: 'startProcessing' },
  //   { title: 'differences.table.actionsMenu.finishProcessing', value: 'finishProcessing' },
  //   { title: 'differences.table.actionsMenu.no-differences', value: 'noDifferences' }
  // ]

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
          content={translate('differences.table.actions.startProcessing.message')}
          onConfirmClick={handleStartProcessing}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
        />
      )}
    </div>
  )
}
