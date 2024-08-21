import { TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NewRoleFormData } from '@/schemas/newRoleSchema'
import CheckboxRoles from './CheckboxRoles'
import useGetPermissionsAll from '@/hooks/services/roles/useGetPermissionsAll'
import useGetSingleRole from '@/hooks/services/roles/useGetSingleRoles'

interface NewRoleFormProps extends UseFormReturn<NewRoleFormData> {
  roleId: string
}

export default function NewRoleForm({
  control,
  formState: { errors },
  roleId
}: NewRoleFormProps) {
  const { t: translate } = useTranslation()
  const permissions = useGetPermissionsAll();
  const currentRole = useGetSingleRole(roleId)

  console.log(currentRole);
  

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
            name="name"
            required
            fullWidth
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message ? translate(errors.name.message) : ''}
          />
        )}
      />

      {/* <Controller
        name="permissionIds"
        control={control}
        render={({ field: { onChange } }) => (
          <CheckboxRoles
            permissions={permissions}
            currentPermissions={currentRole.rolePermissions}
            onChange={onChange}
          />
        )}
      /> */}
    </>
  )
}
