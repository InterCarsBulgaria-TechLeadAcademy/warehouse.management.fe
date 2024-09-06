import { RoleDetailsDto } from '@/services/model'
import { FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NewUserFormData } from '@/schemas/newUserSchema'
import ShowHideFunctionality from '@/components/shared/ShowHideFunctionality'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useGetRoles from '@/hooks/services/roles/useGetRoles'

interface NewUserFormProps extends UseFormReturn<NewUserFormData> {
  defaultValues?: {
    name: string
    email: string
    role: string
  }
}

export default function NewUserForm({
  control,
  formState: { errors },
  defaultValues = { name: '', email: '', role: '' }
}: NewUserFormProps) {
  const { t: translate } = useTranslation()
  const roles = useGetRoles()
  console.log(roles);
  
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
        name="email"
        defaultValue={defaultValues?.email || ''}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('Имейл')}
            id="email"
            name="email"
            required
            fullWidth
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message ? translate(errors.email.message) : ''}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ShowHideFunctionality
            field={field}
            label={translate('login.labels.password')}
            id="password"
            name="password"
            required
            fullWidth
            VisibilityOff={VisibilityOff}
            Visibility={Visibility}
            color="secondary"
            error={!!errors.password}
            helperText={errors.password?.message ? translate(errors.password.message) : ''}
          />
        )}
      />
      <Controller
        name="repass"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ShowHideFunctionality
            field={field}
            label={translate('Потвърди парола')}
            id="repass"
            name="repass"
            required
            fullWidth
            VisibilityOff={VisibilityOff}
            Visibility={Visibility}
            color="secondary"
            error={!!errors.repass}
            helperText={errors.repass?.message ? translate(errors.repass.message) : ''}
          />
        )}
      />

      <Controller
        name="role"
        defaultValue={defaultValues?.role || ''}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-role-label">{translate('Роля')}</InputLabel>
            <Select
              {...field}
              label={translate('Роля')}
              labelId="demo-role-label"
              id="demo-role"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}>
              {roles.map((role: RoleDetailsDto) => (
                <MenuItem key={role.id} value={role.id as string}>
                  <ListItemText primary={role.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}
