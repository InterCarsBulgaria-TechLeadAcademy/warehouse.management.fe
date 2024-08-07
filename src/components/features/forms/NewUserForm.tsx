import { MarkerDto } from '@/services/model'
import { FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useGetMarkers from '@/hooks/services/markers/useGetMarkers'
import { NewUserFormData } from '@/schemas/newUserSchema'
import ShowHideFunctionality from '@/components/shared/ShowHideFunctionality'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

interface NewUserFormProps extends UseFormReturn<NewUserFormData> {
  defaultValues?: {
    name: string
    email: string
    role: string
    rights: number[]
  }
}

export default function NewUserForm({
  control,
  formState: { errors },
  defaultValues = { name: '', email: '', role: '', rights: [] }
}: NewUserFormProps) {
  const { t: translate } = useTranslation()
  // TODO: Add functionality to take rights from BE.
  const markers = useGetMarkers()

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
          <TextField
            {...field}
            label={translate('Роля')}
            id="role"
            name="role"
            required
            fullWidth
            autoFocus
            error={!!errors.role}
            helperText={errors.role?.message ? translate(errors.role.message) : ''}
          />
        )}
      />

      <Controller
        name="rights"
        defaultValue={defaultValues.rights?.map(String)}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-rights-label">
              {translate('Права')}
            </InputLabel>
            <Select
              {...field}
              label={translate('Права')}
              labelId="demo-multiple-rights-label"
              id="demo-multiple-rights"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              renderValue={(selected) => {
                const selectedMarkerNames = selected
                  .map((id) => {
                    const isMarker = markers.find((marker) => marker.id === Number(id))
                    if (isMarker) {
                      return isMarker.name
                    }
                  })
                  .join(', ')

                return selectedMarkerNames
              }}>
              {markers.map((marker: MarkerDto) => (
                <MenuItem key={marker.id} value={marker.id?.toString()}>
                  <ListItemText primary={marker.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}
