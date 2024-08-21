import { TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NewRoleFormData } from '@/schemas/newRoleSchema'
import CheckboxRoles from './CheckboxRoles'
import useGetPermissionsAll from '@/hooks/services/roles/useGetPermissionsAll'
import useGetSingleRole from '@/hooks/services/roles/useGetSingleRoles'

interface NewRoleFormProps extends UseFormReturn<NewRoleFormData> {
  roleId?: number | undefined
  roleName?: string | undefined
}

export default function NewRoleForm({
  control,
  formState: { errors },
  roleName,
  roleId
}: NewRoleFormProps) {
  const { t: translate } = useTranslation()
  const permissions = useGetPermissionsAll();
  const currentRole = roleId ? useGetSingleRole(roleId) : null;
  

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('vendors.newVendor.labels.name')}
            id="name"
            defaultValue={roleName || ''}
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
        render={({ field: { onChange } }) => (
          <CheckboxRoles
            permissions={permissions}
            currentPermissions={currentRole?.routePermissions || []}
            onChange={onChange}
          />
        )}
      />
    </>
  )
}
