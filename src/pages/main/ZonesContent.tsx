import SkeletonPage from '@/components/features/SkeletonPage'
import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import { NewZoneFormData, newZoneSchema } from '@/schemas/newZoneSchema'
import ZonesContentsTable from '@/components/features/main/ZonesContentsTable'
import NewZoneContentForm from '@/components/features/forms/NewZoneContentForm'

export default function ZonesContent() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewZoneFormData> = (data) => {
    console.log(data)
    onCloseDialog()
  }

  return (
    <>
      <SkeletonPage
        header={translate('zonesContent.title')}
        description={translate('zonesContent.description')}
        buttonText={translate('zonesContent.labels.newZone')}
        buttonClickHandler={handleClickOpen}
        table={<ZonesContentsTable />}
      />

      <FormDialog<NewZoneFormData>
        open={openDialog}
        title={translate('newZone.title')}
        discardText={translate('newZone.labels.exit')}
        confirmText={translate('newZone.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newZoneSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewZoneContentForm {...methods} />}
      />
    </>
  )
}
