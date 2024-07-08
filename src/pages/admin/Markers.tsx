import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import MarkersTable from '@/components/features/admin/MarkersTable'
import { NewMarkerFormData, newMarkerSchema } from '@/schemas/newMarkerSchema'
import FormDialog from '@/components/shared/FormDialog'
import NewMarkerForm from '@/components/features/forms/NewMarkerForm'
import { useMutation } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'

export default function Markers() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const mutation = useMutation({
    mutationFn: getWarehouseManagementApi().postApiMarkerAdd,
    onSuccess: (data) => {
      console.log('Успешна заявка', data)
    },
    onError: (error) => {
      console.error('Грешка при заявката', error)
    }
  })

  const handleSubmit: SubmitHandler<NewMarkerFormData> = (data) => {
    console.log(data)
    // mutation.mutate(JSON.stringify({ name: data.markerName }))
    mutation.mutate({ name: data.markerName })
    onCloseDialog()
  }

  return (
    <>
      <SkeletonPage
        header={translate('markers.title')}
        description={translate('markers.description')}
        buttonText={translate('markers.labels.newMarker')}
        buttonClickHandler={handleClickOpen}
        table={<MarkersTable />}
      />

      <FormDialog<NewMarkerFormData>
        open={openDialog}
        title={translate('newMarker.title')}
        discardText={translate('newMarker.labels.exit')}
        confirmText={translate('newMarker.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newMarkerSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewMarkerForm {...methods} />}
      />
    </>
  )
}
