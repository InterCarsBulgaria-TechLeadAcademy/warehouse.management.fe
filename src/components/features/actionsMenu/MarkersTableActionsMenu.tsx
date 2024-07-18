import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
import { SubmitHandler } from 'react-hook-form'
import { NewMarkerFormData, newMarkerSchema } from '@/schemas/newMarkerSchema'
import FormDialog from '@/components/shared/FormDialog'
import NewMarkerForm from '@/components/features/forms/NewMarkerForm'
import { MarkerDto } from '@/services/model'
import TableActionsMenu from './TableActionsMenu'
import useDeleteMarker from '@/hooks/services/markers/useDeleteMarker'
import useUpdateMarker from '@/hooks/services/markers/useUpdateMarker'

interface MarkersTableActionsMenuProps {
  marker: MarkerDto
}

export default function MarkersTableActionsMenu({ marker }: MarkersTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationDelete = useDeleteMarker(marker.name!)
  const mutationUpdate = useUpdateMarker(marker.name!)

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
    mutationDelete.mutate(marker.id!)
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewMarkerFormData> = (data) => {
    mutationUpdate.mutate({ id: marker.id!, data: { name: data.markerName } })
  }

  const options = [
    { title: 'actionsMenu.options.edit', value: 'edit' },
    { title: 'actionsMenu.options.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewMarkerFormData>
          open={true}
          title={translate('editMarker.title')}
          discardText={translate('editMarker.labels.exit')}
          confirmText={translate('editMarker.labels.edit')}
          onCloseDialog={handleClose}
          schema={newMarkerSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => <NewMarkerForm {...methods} defaultValue={marker.name!} />}
        />
      )}

      {selectedOption === 'delete' && (
        <WarningActionDialog
          open={true}
          title={translate('newMarker.deleteAction.title')}
          content={translate('newMarker.deleteAction.message', {
            marker: marker.name
          })}
          discardText={translate('newMarker.deleteAction.labels.discard')}
          confirmText={translate('newMarker.deleteAction.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
