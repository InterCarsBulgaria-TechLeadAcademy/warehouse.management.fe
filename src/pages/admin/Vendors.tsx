import SkeletonPage from '@/components/features/SkeletonPage'
import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import VendorsTable from '@/components/features/admin/VendorsTable'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import NewVendorForm from '@/components/features/forms/NewVendorForm'

export default function Vendors() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewVendorFormData> = (data) => {
    console.log(data)
    onCloseDialog()
  }

  return (
    <>
      <SkeletonPage
        header={translate('vendors.title')}
        description={translate('vendors.description')}
        buttonText={translate('vendors.labels.newVendor')}
        buttonClickHandler={handleClickOpen}
        table={<VendorsTable />}
      />

      <FormDialog<NewVendorFormData>
        open={openDialog}
        title={translate('newVendor.title')}
        discardText={translate('newVendor.labels.exit')}
        confirmText={translate('newVendor.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newVendorSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewVendorForm {...methods} />}
      />
    </>
  )
}
