import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import login_image from '../assets/login-image.webp'
import intercars_logo from '../assets/ic_new_logo.jpg'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
    .object({
        email: yup.string().required('Полето за имейл e задължително').email('Невалиден имейл адрес'),
        password: yup.string().required('Полето за парола e задължително').min(4, 'Паролата трябва да e поне 4 символа').max(10, 'Паролата трябва до 10 символа')
            .matches(/[0-9]/, 'Паролата трябва да съдържа поне една цифра')
            .matches(/[!@#$%^&*]/, 'Паролата трябва да съдържа поне един специален знак')
    })
    .required()

interface LoginSchema extends yup.InferType<typeof schema> {
    email: string;
    password: string;
}

const theme = createTheme({
    palette: {
        primary: {
            // червено
            main: '#C9022D',
            light: '#C9022D80',
            dark: '#88151b',
        },
        // черно
        secondary: {
            main: '#000000'
        },
    },
});

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<LoginSchema> = (data) => console.log(data)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${login_image})`, backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }}>

                    <Box component="div" sx={{
                        background: theme.palette.primary.light,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
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

                        <Box component="div" sx={{
                            fontSize: '1.5em',
                            fontWeight: 800,
                            padding: '0 2em',
                            textAlign: 'center',
                            margin: '2em 0',
                        }}>
                            Вътрешна система за менажиране на доставки
                        </Box>


                        <Typography component="h1" variant="h5" sx={{
                            fontSize: '2em',
                            fontWeight: 800,

                        }} >
                            Вход
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Имейл"
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
                                        label="Парола"
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
                                disabled={Object.keys(errors).length > 0}
                            >
                                Вход
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </ThemeProvider>
    );
}
