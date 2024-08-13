import React from 'react'
import { useTranslation } from 'react-i18next'
import { DifferenceDto } from '@/services/model'
import FormDialog from '../../shared/FormDialog'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import NewVendorForm from '../forms/NewVendorForm'
import { SubmitHandler } from 'react-hook-form'
import TableActionsMenu from './TableActionsMenu'
import useUpdateVendor from '@/hooks/services/vendors/useUpdateVendor'
import useDeleteVendor from '@/hooks/services/vendors/useDeleteVendor'
import ConfirmDialog from '../../shared/ConfirmDialog.tsx'
import { useDifferenceStartProcessing } from '@/hooks/services/differences/useDifferenceStartProcessing.ts'

interface DifferencesTableActionsMenuProps {
  differences: any
}

export default function DifferencesTableActionsMenu({
  differences
}: DifferencesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const differenceStartProcessing = useDifferenceStartProcessing()
  // const differenceFinishProcessing = useDifferenceFinishProcessing()

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
  const options = [
    { title: 'differences.table.actionsMenu.startProcessing', value: 'startProcessing' },
    { title: 'differences.table.actionsMenu.finishProcessing', value: 'finishProcessing' },
    { title: 'differences.table.actionsMenu.no-differences', value: 'noDifferences' }
  ]

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
