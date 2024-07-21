import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import login_image from '../assets/login-image.webp'
import intercars_logo from '../assets/ic_new_logo.jpg'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { LoginFormData, loginSchema } from '@/schemas/loginSchema'
import LoginForm from '@/components/features/forms/LoginForm'
import { getUserFromCookies, loginUser } from '@/hooks/services/auth/user'
import { useNavigate } from 'react-router-dom'
import { DELIVERIES_PATH } from '@/router/routerPaths';
import { useAuthContext } from '@/contexts/Auth'

export default function Login() {
  const { setUser } = useAuthContext();
  const { t: translate } = useTranslation()
  const navigate = useNavigate();

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log(data);
    try {
      // Тук ползвам двете функции едната за логване и сторване на токенте а другата за вземане на токена и пращам рекуест към БЕ за юзер данните..
      await loginUser();
      const fetchedUser = await getUserFromCookies(); // Request from BE for user data
      // fetchedUser.role = 'regular' // Uncomment it to change role..
      setUser({ username: fetchedUser.username, role: fetchedUser.role })
      navigate(`${DELIVERIES_PATH}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
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

          <Box
            component="form"
            onSubmit={methods.handleSubmit(onSubmit)}
            sx={{ mt: 1, maxWidth: '30em' }}>
            <LoginForm {...methods} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
