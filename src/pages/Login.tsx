import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import login_image from '../assets/login-image.webp'
import intercars_logo from '../assets/ic_new_logo.jpg'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useTranslation } from 'react-i18next';


export default function Login() {

    const { t: translate } = useTranslation()
    const schema = yup
        .object({
            email: yup.string().required(translate('login.The email field is required')).email(translate('login.Invalid email')),
            password: yup.string().required(translate('login.The password field is required')).min(4, translate('login.The password must be at least 4 characters long')).max(10, translate('The password must be up to 10 characters long'))
                .matches(/[0-9]/, translate('login.Password must contain at least one digit'))
                .matches(/[!@#$%^&*]/, translate('login.Password must contain at least one special character'))
        })
        .required()

    interface LoginSchema extends yup.InferType<typeof schema> {
        email: string;
        password: string;
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<LoginSchema> = (data) => console.log(data)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const formHasErrors = () =>{
        return Object.keys(errors).length > 0
    }


    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />

            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${login_image})`, backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}>

                <Box component="div" sx={{
                    backgroundColor: 'primary.main',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.4
                }}>
                </Box>

            </Grid>

            <Grid
                item xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Box component="div" sx={{ width: "228px", height: "84px" }}>
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

                    <Typography variant="h4" sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: '2em 0',
                    }}>
                        {translate('login.Internal delivery management system')}
                    </Typography>

                    <Typography  variant="h4" sx={{ 
                        fontWeight: 'bold' 
                        }} >
                        {translate('login.Login')}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={translate('login.Email')}
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
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={translate('login.Password')}
                                    id="password"
                                    name="password"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    autoComplete="current-password"
                                    color="secondary"
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={formHasErrors()}
                        >
                            {translate('login.Login')}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
