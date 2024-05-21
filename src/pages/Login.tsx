import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import login_image from '../../assets/login-image.webp'

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

export function Login() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

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
                                src="https://bg.intercars.eu/assets/application/img/common/ic_new_logo.jpg"
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Имейл"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                color="secondary"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Парола"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                color="secondary"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
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