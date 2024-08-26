import React from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import { NewMarkerFormData, newMarkerSchema } from '@/schemas/newMarkerSchema'
import FormDialog from '@/components/shared/FormDialog'
import NewMarkerForm from '@/components/features/forms/NewMarkerForm'
import { MarkerDto } from '@/services/model'
import TableActionsMenu from './TableActionsMenu'
import useDeleteMarker from '@/hooks/services/markers/useDeleteMarker'
import useUpdateMarker from '@/hooks/services/markers/useUpdateMarker'
import ConfirmDialog from '@/components/shared/ConfirmDialog.tsx'

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

  const onConfirmDelete = () => {
    mutationDelete.mutate(marker.id!)
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewMarkerFormData> = (data) => {
    mutationUpdate.mutate({ id: marker.id!, data: { name: data.markerName } })
    handleClose()
  }

  const options = [
    { title: 'markers.table.actionsMenu.edit', value: 'edit' },
    { title: 'markers.table.actionsMenu.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewMarkerFormData>
          open={true}
          title={translate('markers.table.actions.edit.title')}
          discardText={translate('markers.table.actions.edit.labels.exit')}
          confirmText={translate('markers.table.actions.edit.labels.edit')}
          onCloseDialog={handleClose}
          schema={newMarkerSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => <NewMarkerForm {...methods} markerId={marker.id!} />}
        />
      )}

      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('markers.table.actions.delete.title')}
          content={translate('markers.table.actions.delete.message', {
            marker: marker.name
          })}
          discardText={translate('markers.table.actions.delete.labels.discard')}
          confirmText={translate('markers.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmDelete}
        />
      )}
    </div>
  )
}
