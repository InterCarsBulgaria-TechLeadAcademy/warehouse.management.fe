import { Controller, UseFormReturn } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewDifferenceTypeFormData } from '@/schemas/newDifferenceTypeSchema'

interface NewMarkerFormProps extends UseFormReturn<NewDifferenceTypeFormData> {
  defaultValue?: string
}

export default function NewDifferenceTypeForm({
  control,
  formState: { errors },
  defaultValue
}: NewMarkerFormProps) {
  const { t: translate } = useTranslation()

  return (
    <Controller
      name="differenceTypeName"
      control={control}
      defaultValue={defaultValue || ''}
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
