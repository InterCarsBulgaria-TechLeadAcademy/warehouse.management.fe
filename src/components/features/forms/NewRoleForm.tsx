import { TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NewRoleFormData } from '@/schemas/newRoleSchema'
import CheckboxRoles from './CheckboxRoles'
import useGetPermissionsAll from '@/hooks/services/roles/useGetPermissionsAll'

interface NewRoleFormProps extends UseFormReturn<NewRoleFormData> {
  defaultValues?: {
    name: string
    permissions: string[]
  }
}

export default function NewRoleForm({
  control,
  formState: { errors },
  defaultValues = { name: '', permissions: [] }
}: NewRoleFormProps) {
  const { t: translate } = useTranslation()
  const permissions = useGetPermissionsAll();
  
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
        name="permissions"
        defaultValue={defaultValues.permissions?.map(String)}
        control={control}
        render={({ }) => (
          <CheckboxRoles permissions={permissions} />
        )}
      />
    </>
  )
}
