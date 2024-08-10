import React from 'react'
import { useTranslation } from 'react-i18next'
import { EntryDto } from '@/services/model'
import TableActionsMenu from './TableActionsMenu'
import ConfirmDialog from '@/components/shared/ConfirmDialog.tsx'
import { useStartProcessing } from '@/hooks/services/entries/useStartProcessing.ts'
import { useFinishProcessing } from '@/hooks/services/entries/useFinishProcessing.ts'
import { getEntryStatus } from '@/utils/getEntryStatus.ts'
import { ChipStatus } from '@/hooks/useChipLabel.ts'

interface ZonesTableActionsMenuProps {
  entry: EntryDto
}

export default function ZonesContentTableActionsMenu({ entry }: ZonesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const entryStartProcessing = useStartProcessing()
  const entryFinishProcessing = useFinishProcessing()

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
    entryStartProcessing.mutate(entry.id!)
    handleClose()
  }

  function handleFinishProcessing() {
    entryFinishProcessing.mutate(entry.id!)
    handleClose()
  }

  const options = (() => {
    const options = []
    const availableOptions = {
      move: { title: 'zonesContent.table.actionsMenu.MoveToNewZone', value: 'move' },
      startProcessing: {
        title: 'zonesContent.table.actionsMenu.StartProcessing',
        value: 'startProcessing'
      },
      finishProcessing: {
        title: 'zonesContent.table.actionsMenu.FinishProcessing',
        value: 'finishProcessing'
      }
    }

    const entryStatus = getEntryStatus(entry)

    if (entryStatus === ChipStatus.Waiting) {
      options.push(availableOptions.move)
      options.push(availableOptions.startProcessing)
    } else if (entryStatus === ChipStatus.Processing) {
      options.push(availableOptions.move)
      options.push(availableOptions.finishProcessing)
    }

    return options.length > 0
      ? options
      : [{ title: 'zonesContent.table.actionsMenu.NoActions', value: '' }]
  })()

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'startProcessing' && (
        <ConfirmDialog
          open={true}
          discardText={translate('zonesContent.table.actions.startProcessing.labels.discard')}
          confirmText={translate('zonesContent.table.actions.startProcessing.labels.confirm')}
          title={translate('zonesContent.table.actions.startProcessing.title')}
          content={translate('zonesContent.table.actions.startProcessing.message', {
            goodNumber: entry.id!
          })}
          onConfirmClick={handleStartProcessing}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
        />
      )}

      {selectedOption === 'finishProcessing' && (
        <ConfirmDialog
          open={true}
          discardText={translate('zonesContent.table.actions.finishProcessing.labels.discard')}
          confirmText={translate('zonesContent.table.actions.finishProcessing.labels.confirm')}
          title={translate('zonesContent.table.actions.finishProcessing.title')}
          content={translate('zonesContent.table.actions.finishProcessing.message', {
            goodNumber: entry.id!
          })}
          onConfirmClick={handleFinishProcessing}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
        />
      )}
    </div>
  )
}
