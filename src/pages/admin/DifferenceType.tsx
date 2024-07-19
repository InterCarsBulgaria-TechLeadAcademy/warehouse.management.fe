import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import FormDialog from '@/components/shared/FormDialog'
import DifferenceTypeTable from '../../components/features/admin/DifferenceTypeTable'
import NewDifferenceTypeForm from '@/components/features/forms/NewDifferenceTypeForm'
import {
  NewDifferenceTypeFormData,
  newDifferenceTypeSchema
} from '@/schemas/newDifferenceTypeSchema'
import usePostDifferenceType from '@/hooks/services/differenceType/usePostDifferenceType'

export default function DifferenceType() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [differenceTypeName, setDifferenceTypeName] = useState('')
  const mutationCreate = usePostDifferenceType(differenceTypeName)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewDifferenceTypeFormData> = (data) => {
    setDifferenceTypeName(data.differenceTypeName)
    mutationCreate.mutate({ name: data.differenceTypeName })
  }

  return (
    <>
      <SkeletonPage
        header={translate('differenceType.title')}
        description={translate('differenceType.description')}
        buttonText={translate('differenceType.labels.newDifferenceType')}
        buttonClickHandler={handleClickOpen}
        table={<DifferenceTypeTable />}
      />

      <FormDialog<NewDifferenceTypeFormData>
        open={openDialog}
        title={translate('differenceType.newDifferenceType.title')}
        discardText={translate('differenceType.newDifferenceType.labels.exit')}
        confirmText={translate('differenceType.newDifferenceType.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newDifferenceTypeSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewDifferenceTypeForm {...methods} />}
      />
    </>
  )
}
