import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import MarkersTable from '@/components/features/admin/MarkersTable'
import { NewMarkerFormData, newMarkerSchema } from '@/schemas/newMarkerSchema'
import FormDialog from '@/components/shared/FormDialog'
import NewMarkerForm from '@/components/features/forms/NewMarkerForm'
import usePostMarker from '@/hooks/services/markers/usePostMarker'

export default function Markers() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [markerName, setMarkerName] = useState('')
  const mutationCreate = usePostMarker(markerName)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewMarkerFormData> = (data) => {
    setMarkerName(data.markerName)
    mutationCreate.mutate({ name: data.markerName })
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
        title={translate('markers.newMarker.title')}
        discardText={translate('markers.newMarker.labels.exit')}
        confirmText={translate('markers.newMarker.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newMarkerSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewMarkerForm {...methods} />}
      />
    </>
  )
}
