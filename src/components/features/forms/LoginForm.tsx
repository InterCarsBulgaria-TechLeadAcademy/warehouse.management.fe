import { Controller, UseFormReturn } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ShowHideFunctionality from '@/components/shared/ShowHideFunctionality'
import { formHasErrors } from '@/utils/formUtils'
import { LoginFormData } from '@/schemas/loginSchema'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function LoginForm({
  control,
  formState: { errors }
}: UseFormReturn<LoginFormData>) {
  const { t: translate } = useTranslation()

  return (
    <>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('Име')}
            id="username"
            name="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="username"
            autoFocus
            color="secondary"
            error={!!errors.username}
            helperText={errors.username?.message ? translate(errors.username.message) : ''}
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={formHasErrors(errors)}>
        {translate('login.labels.logged-in')}
      </Button>
    </>
  )
}
