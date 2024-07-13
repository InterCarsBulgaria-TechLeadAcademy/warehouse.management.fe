import SkeletonPage from '@/components/features/SkeletonPage'
import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import VendorsTable from '@/components/features/admin/VendorsTable'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import NewVendorForm from '@/components/features/forms/NewVendorForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSnackbar } from '@/hooks/useSnackbar'

export default function Vendors() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const queryClient = useQueryClient()
  const [vendorName, setVendorName] = useState('')
  const { showSnackbar } = useSnackbar()

  const mutation = useMutation({
    mutationFn: getWarehouseManagementApi().postApiVendorAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('newVendor.snackBar.messages.createVendor.success', { name: vendorName }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newVendor.snackBar.messages.createVendor.error'),
        type: 'error'
      })
    }
  })

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewVendorFormData> = (data) => {
    setVendorName(data.vendorName);
    const markerIds = data.markers!.map((marker) => Number(marker))
    mutation.mutate({ name: data.vendorName, systemNumber: data.vendorNumber, markerIds: markerIds })
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
