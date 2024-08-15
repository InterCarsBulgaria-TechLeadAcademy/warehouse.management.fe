import { MarkerDto } from '@/services/model'
import { FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useGetMarkers from '@/hooks/services/markers/useGetMarkers'
import { NewUserFormData } from '@/schemas/newUserSchema'
import ShowHideFunctionality from '@/components/shared/ShowHideFunctionality'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CheckboxRoles from './CheckboxRoles'

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
  const roles = ['regular' , 'admin' ]

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
        render={({ field }) => (
          <CheckboxRoles />
        )}
      />
    </>
  )
}
