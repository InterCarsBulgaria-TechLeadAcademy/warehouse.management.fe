import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSnackbar } from '@/hooks/useSnackbar'
import { ZoneDto, ZoneFormDto } from '@/services/model'
import { BodyType } from '@/services/api'
import { SubmitHandler } from 'react-hook-form'
import { NewZoneFormData, newZoneSchema } from '@/schemas/newZoneSchema'
import TableActionsMenu from './TableActionsMenu'
import FormDialog from '@/components/shared/FormDialog'
import NewZoneForm from '../forms/NewZoneForm'

interface ZonesTableActionsMenuProps {
  zone: ZoneDto
}

export default function ZonesTableActionsMenu({ zone }: ZonesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const { showSnackbar } = useSnackbar()

  const handleClose = () => {
    setSelectedOption(null)
    setAnchorEl(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiZoneDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      showSnackbar({
        message: translate('newZone.snackBar.messages.deleteZone.success', { name: zone.name }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newZone.snackBar.messages.deleteZone.error'),
        type: 'error'
      })
    }
  })

  const onConfirmClick = () => {
    mutationDelete.mutate(zone.id!)
    handleClose()
  }

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<ZoneFormDto> }) =>
      getWarehouseManagementApi().putApiZoneEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      showSnackbar({
        message: translate('newZone.snackBar.messages.updateZone.success', { name: zone.name }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newZone.snackBar.messages.updateZone.error'),
        type: 'error'
      })
    }
  })

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
                markersIds: zone.markers?.map((marker) => marker.markerId!) || ([] as string[]),
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
          content={translate('deleteAction.zones.message', { name: name })}
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
