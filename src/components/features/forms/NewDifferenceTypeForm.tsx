import { Controller, UseFormReturn } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewDifferenceTypeFormData } from '@/schemas/newDifferenceTypeSchema'
import useGetDifferenceType from '@/hooks/services/differenceType/useGetDifferenceType'

interface NewMarkerFormProps extends UseFormReturn<NewDifferenceTypeFormData> {
  differenceTypeId?: number
}

export default function NewDifferenceTypeForm({
  control,
  formState: { errors },
  differenceTypeId
}: NewMarkerFormProps) {
  const { t: translate } = useTranslation()
  const differenceType = useGetDifferenceType(differenceTypeId)

  return (
    <Controller
      name="differenceTypeName"
      control={control}
      defaultValue={differenceType?.name || ''}
      render={({ field }) => (
        <TextField
          {...field}
          label={translate('differenceType.newDifferenceType.labels.name')}
          id="differenceTypeName"
          name="differenceTypeName"
          required
          fullWidth
          autoFocus
          error={!!errors.differenceTypeName}
          helperText={
            errors.differenceTypeName?.message ? translate(errors.differenceTypeName.message) : ''
          }
        />
      )}
    />
  )
}
