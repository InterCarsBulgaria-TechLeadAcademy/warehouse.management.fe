import { TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NewRoleFormData } from '@/schemas/newRoleSchema'
import CheckboxRoles from './CheckboxRoles'

interface NewRoleFormProps extends UseFormReturn<NewRoleFormData> {
  defaultValues?: {
    name: string
    rights: string[]
  }
}

export default function NewRoleForm({
  control,
  formState: { errors },
  defaultValues = { name: '', rights: [] }
}: NewRoleFormProps) {
  const { t: translate } = useTranslation()

  return (
    <>
      <Controller
        name="name"
        defaultValue={defaultValues?.name || ''}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('vendors.newVendor.labels.name')}
            id="name"
            name="name"
            required
            fullWidth
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message ? translate(errors.name.message) : ''}
          />
        )}
      />

      <Controller
        name="rights"
        defaultValue={defaultValues.rights?.map(String)}
        control={control}
        render={({ }) => (
          <CheckboxRoles rights={defaultValues.rights} />
        )}
      />
    </>
  )
}
