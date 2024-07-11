import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { SubmitHandler } from 'react-hook-form'
import { NewMarkerFormData, newMarkerSchema } from '@/schemas/newMarkerSchema'
import FormDialog from '@/components/shared/FormDialog'
import NewMarkerForm from '@/components/features/forms/NewMarkerForm'
import { BodyType } from '@/services/api'
import { MarkerDto, MarkerFormDto } from '@/services/model'
import { useSnackbar } from '@/hooks/useSnackbar'
import TableActionsMenu from './TableActionsMenu'
import axios from 'axios'

interface MarkersTableActionsMenuProps {
  marker: MarkerDto
}

export default function MarkersTableActionsMenu({ marker }: MarkersTableActionsMenuProps) {
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
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiMarkerDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
      showSnackbar({
        message: translate('newMarker.snackBar.messages.deleteMarker.success', {
          name: marker.name
        }),
        type: 'success'
      })
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          let location = error.response.data.Message.split(':').shift().split(' ').pop() //example: zones
          let specificLocation = error.response.data.Message.split(':').pop() // example: zone 1
          switch (location) {
            case 'Zones':
              location = translate('markers.error.zones')
              break
            //TODO: ако има други места, където се използва Markers
          }
          showSnackbar({
            message: `${translate('markers.error.errorMessage', { location: location })}: ${specificLocation}`,
            type: 'error'
          })
        } else {
          showSnackbar({
            message: translate('newMarker.snackBar.messages.deleteMarker.error'),
            type: 'error'
          })
        }
      } else {
        showSnackbar({
          message: translate('newMarker.snackBar.messages.deleteMarker.error'),
          type: 'error'
        })
      }
    }
  })

  const onConfirmClick = () => {
    mutationDelete.mutate(marker.id!)
    handleClose()
  }

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<MarkerFormDto> }) =>
      getWarehouseManagementApi().putApiMarkerEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
      showSnackbar({
        message: translate('newMarker.snackBar.messages.updateMarker.success', {
          name: marker.name
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newMarker.snackBar.messages.updateMarker.error'),
        type: 'error'
      })
    }
  })

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
            marker: name
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
