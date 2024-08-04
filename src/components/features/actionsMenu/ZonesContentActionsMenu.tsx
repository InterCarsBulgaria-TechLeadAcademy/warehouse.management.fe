import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
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

export default function ZonesContentTableActionsMenu({ zone }: ZonesTableActionsMenuProps) {
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

  const onConfirmClick = () => {
    mutationDelete.mutate(zone.id!)
    handleClose()
  }

  //TODO: да тествам когато БЕ оправят дали се променят всички полета, не само name
  const handleSubmit: SubmitHandler<NewZoneFormData> = (data) => {
    const markerIds = data.markers!.map((marker) => Number(marker))
    mutationUpdate.mutate({
      id: zone.id!,
      data: { name: data.zoneName, markerIds: markerIds, isFinal: data.isFinal }
    })
  }

  const options = [
    { title: 'actionsMenu.options.edit', value: 'edit' },
    { title: 'actionsMenu.options.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewZoneFormData>
          open={true}
          title={translate('newZone.editZone.title')}
          discardText={translate('newZone.editZone.labels.exit')}
          confirmText={translate('newZone.editZone.labels.edit')}
          onCloseDialog={handleClose}
          schema={newZoneSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => (
            <NewZoneForm
              {...methods}
              defaultValues={{
                name: zone.name!,
                markersIds: zone.markers?.map((marker) => marker.markerId!) || ([] as number[]),
                isFinal: zone.isFinal
              }}
            />
          )}
        />
      )}

      {selectedOption === 'delete' && (
        <WarningActionDialog
          open={true}
          title={translate('deleteAction.zones.title')}
          content={translate('deleteAction.zones.message', { name: zone.name })}
          discardText={translate('deleteAction.zones.labels.discard')}
          confirmText={translate('deleteAction.zones.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
