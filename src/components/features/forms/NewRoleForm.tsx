import { TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NewRoleFormData } from '@/schemas/newRoleSchema'
import CheckboxRoles from './CheckboxRoles'
import useGetPermissionsAll from '@/hooks/services/roles/useGetPermissionsAll'

interface NewRoleFormProps extends UseFormReturn<NewRoleFormData> {
  defaultValues?: {
    name: string
    permissionIds: string[]
  }
}

export default function NewRoleForm({
  control,
  formState: { errors },
  defaultValues = { name: '', permissionIds: [] }
}: NewRoleFormProps) {
  const { t: translate } = useTranslation()
  const permissions = useGetPermissionsAll();
  defaultValues.permissionIds.push("9f60c085-dcf9-4241-a1d2-2debc6b0ade3")

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
        name="permissionIds"
        control={control}
        render={({ }) => (
          <CheckboxRoles permissions={permissions} permissionIds={defaultValues.permissionIds} />
        )}
      />
    </>
  )
}
