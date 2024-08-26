import React from 'react'
import { useTranslation } from 'react-i18next'
import ConfirmDialog from '@/components/shared/ConfirmDialog.tsx'
import { ZoneDto } from '@/services/model'
import { SubmitHandler } from 'react-hook-form'
import { NewZoneFormData, newZoneSchema } from '@/schemas/newZoneSchema'
import TableActionsMenu from './TableActionsMenu'
import FormDialog from '@/components/shared/FormDialog'
import NewZoneForm from '../forms/NewZoneForm'
import useDeleteZone from '@/hooks/services/zones/useDeleteZone'
import useUpdateZone from '@/hooks/services/zones/useUpdateZone'

interface ZonesTableActionsMenuProps {
  zone: ZoneDto
}

export default function ZonesTableActionsMenu({ zone }: ZonesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationDelete = useDeleteZone(zone.name!)
  const mutationUpdate = useUpdateZone(zone.name!)

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
    mutationDelete.mutate(zone.id!)
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewZoneFormData> = (data) => {
    const markerIds = data.markers!.map((marker) => Number(marker))
    mutationUpdate.mutate({
      id: zone.id!,
      data: { name: data.zoneName, markerIds: markerIds, isFinal: data.isFinal }
    })
  }

  const options = [
    { title: 'zones.table.actionsMenu.edit', value: 'edit' },
    { title: 'zones.table.actionsMenu.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewZoneFormData>
          open={true}
          title={translate('zones.table.actions.edit.title')}
          discardText={translate('zones.table.actions.edit.labels.exit')}
          confirmText={translate('zones.table.actions.edit.labels.edit')}
          onCloseDialog={handleClose}
          schema={newZoneSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => <NewZoneForm {...methods} zoneId={zone.id!} />}
        />
      )}

      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('zones.table.actions.delete.title')}
          content={translate('zones.table.actions.delete.message', { name: zone.name })}
          discardText={translate('zones.table.actions.delete.labels.discard')}
          confirmText={translate('zones.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmDelete}
        />
      )}
    </div>
  )
}
