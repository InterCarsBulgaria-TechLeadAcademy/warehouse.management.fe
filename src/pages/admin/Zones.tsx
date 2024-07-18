import SkeletonPage from '@/components/features/SkeletonPage'
import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import { NewZoneFormData, newZoneSchema } from '@/schemas/newZoneSchema'
import ZonesTable from '@/components/features/admin/ZonesTable'
import NewZoneForm from '@/components/features/forms/NewZoneForm'
import usePostZone from '@/hooks/services/zones/usePostZone'

export default function Zones() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [zoneName, setZoneName] = useState('')
  const mutationPost = usePostZone(zoneName)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewZoneFormData> = (data) => {
    setZoneName(data.zoneName)
    const markerIds = data.markers!.map((marker) => Number(marker))
    mutationPost.mutate({ name: data.zoneName, markerIds: markerIds, isFinal: data.isFinal })
  }

  return (
    <>
      <SkeletonPage
        header={translate('zones.title')}
        description={translate('zones.description')}
        buttonText={translate('zones.labels.newZone')}
        buttonClickHandler={handleClickOpen}
        table={<ZonesTable />}
      />

      <FormDialog<NewZoneFormData>
        open={openDialog}
        title={translate('zones.newZone.title')}
        discardText={translate('zones.newZone.labels.exit')}
        confirmText={translate('zones.newZone.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newZoneSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewZoneForm {...methods} />}
      />
    </>
  )
}
