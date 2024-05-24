import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import login_image from '../assets/login-image.webp'
import intercars_logo from '../assets/ic_new_logo.jpg'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import ShowHideFunctionality from '@/components/shared/ShowHideFunctionality'
import { formHasErrors } from '@/utils/formUtils'

interface LoginSchema extends yup.InferType<typeof schema> {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().required('errors.email.required').email('errors.email.invalid'),
    password: yup
      .string()
      .required('errors.password.required')
      .min(4, 'errors.password.short')
      .max(10, 'errors.password.long')
      .matches(/[0-9]/, 'errors.password.digit')
      .matches(/[!@#$%^&*]/, 'errors.password.specialCharacter')
  })
  .required()

export default function Login() {
  const { t: translate } = useTranslation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<LoginSchema> = (data) => console.log(data)

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* // <Box
    //   sx={{
    //     display: 'flex',
    //     height: '100vh'
    //   }}> */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${login_image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
        <Box
          component="div"
          sx={{
            backgroundColor: 'primary.main',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.4
          }}></Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Box component="div" sx={{ width: '228px', height: '84px' }}>
            <Box
              component="img"
              src={intercars_logo}
              alt="intercars-logo"
              sx={{
                display: 'block',
                width: '100%',
                height: 'auto',
                marginBottom: '1.5em'
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '2em 0'
            }}>
            {translate('login.description')}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold'
            }}>
            {translate('login.title')}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translate('label.email')}
                  id="email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  color="secondary"
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
                  label={translate('label.password')}
                  id="password"
                  name="password"
                  required={true}
                  fullWidth={true}
                  VisibilityOff={VisibilityOff}
                  Visibility={Visibility}
                  color="secondary"
                  error={true}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formHasErrors(errors)}>
              {translate('login.title')}
            </Button>
          </Box>
        </Box>
      </Grid>
      {/* </Box> */}
    </Grid>
  )
}
