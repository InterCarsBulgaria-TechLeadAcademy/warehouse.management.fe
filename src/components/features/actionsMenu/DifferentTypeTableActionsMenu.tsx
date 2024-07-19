import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
import { SubmitHandler } from 'react-hook-form'
import FormDialog from '@/components/shared/FormDialog'
import { DifferenceTypeDto } from '@/services/model'
import TableActionsMenu from './TableActionsMenu'
import useDeleteDifferenceType from '@/hooks/services/differenceType/useDeleteDifferenceType'
import useUpdateDifferenceType from '@/hooks/services/differenceType/useUpdateDifferenceType'
import {
  NewDifferenceTypeFormData,
  newDifferenceTypeSchema
} from '@/schemas/newDifferenceTypeSchema'
import NewDifferenceTypeForm from '../forms/NewDifferenceTypeForm'

interface DifferentTypeTableActionsMenuProps {
  differenceType: DifferenceTypeDto
}

export default function DifferentTypeTableActionsMenu({
  differenceType
}: DifferentTypeTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationDelete = useDeleteDifferenceType(differenceType.name!)
  const mutationUpdate = useUpdateDifferenceType(differenceType.name!)

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
    mutationDelete.mutate(differenceType.id!)
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewDifferenceTypeFormData> = (data) => {
    mutationUpdate.mutate({ id: differenceType.id!, data: { name: data.differenceTypeName } })
  }

  const options = [
    { title: 'differenceType.table.actionsMenu.edit', value: 'edit' },
    { title: 'differenceType.table.actionsMenu.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewDifferenceTypeFormData>
          open={true}
          title={translate('differenceType.table.actions.edit.title')}
          discardText={translate('differenceType.table.actions.edit.labels.exit')}
          confirmText={translate('differenceType.table.actions.edit.labels.edit')}
          onCloseDialog={handleClose}
          schema={newDifferenceTypeSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => (
            <NewDifferenceTypeForm {...methods} defaultValue={differenceType.name!} />
          )}
        />
      )}

      {selectedOption === 'delete' && (
        <WarningActionDialog
          open={true}
          title={translate('differenceType.table.actions.delete.title')}
          content={translate('differenceType.table.actions.delete.message', {
            differenceType: differenceType.name
          })}
          discardText={translate('differenceType.table.actions.delete.labels.discard')}
          confirmText={translate('differenceType.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
