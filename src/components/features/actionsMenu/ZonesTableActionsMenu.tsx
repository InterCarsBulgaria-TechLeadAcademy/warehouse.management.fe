import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSnackbar } from '@/hooks/useSnackbar'
import { ZoneFormDto } from '@/services/model'
import { BodyType } from '@/services/api'
import { SubmitHandler } from 'react-hook-form'
import { NewZoneFormData, newZoneSchema } from '@/schemas/newZoneSchema'
import TableActionsMenu from './TableActionsMenu'
import FormDialog from '@/components/shared/FormDialog'
import NewZoneForm from '../forms/NewZoneForm'

interface ZonesTableActionsMenuProps {
  id: number
  name: string
  markers: any
  // isFinalZone: boolean
}

//da priema isFinalZone
export default function ZonesTableActionsMenu({ id, name, markers }: ZonesTableActionsMenuProps) {
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
        message: translate('newZone.snackBar.messages.deleteZone.success'),
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
    mutationDelete.mutate(id)
    handleClose()
  }

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<ZoneFormDto> }) =>
      getWarehouseManagementApi().putApiZoneEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
      showSnackbar({
        message: translate('newZone.snackBar.messages.updateZone.success'),
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

  const handleSubmit: SubmitHandler<NewZoneFormData> = (data) => {
    mutationUpdate.mutate({ id, data: { name: data.zoneName } })
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
          title={translate('editMarker.title')}
          discardText={translate('editMarker.labels.exit')}
          confirmText={translate('editMarker.labels.create')}
          onCloseDialog={handleClose}
          schema={newZoneSchema}
          onSubmit={handleSubmit}
          //trqbva da promenq i da podavam defaultValue за всички полета

          // renderForm={(methods) => (
          // <NewZoneForm {...methods} defaultValues={(name, markers, isFinalZone)} />
          // )}
          renderForm={(methods) => <NewZoneForm {...methods} defaultValue={name} />}
        />
      )}

      {selectedOption === 'delete' && (
        <WarningActionDialog
          open={true}
          title={translate('deleteAction.zones.title')}
          content={translate('deleteAction.zones.message')}
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
