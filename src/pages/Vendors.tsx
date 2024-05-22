import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import '@fontsource/roboto/500.css'
import VendorsTable from "@/components/features/VendorsTable";

const theme = createTheme({
    palette: {
        primary: {
            // червено
            main: '#C9022D',
            dark: '#88151b',
        }
    },
});

export default function Vendors() {
    return (
        <ThemeProvider theme={theme}>
            <Box component="section" sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                padding: '1em',
                fontFamily: 'roboto'

            }}>

                <Box component="article" sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box component="div" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Box component="h2" sx={{
                            margin: 0
                        }}>
                            Доставчици
                        </Box>
                        <Box component="p" sx={{
                            margin: '0.5em 0 0 0'
                        }}>
                            Управление на доставчици
                        </Box>

                    </Box>

                    <Button variant="contained">+ нов доставчик</Button>

                </Box>

                <Box component="article">
                    <VendorsTable />

                </Box>
            </Box>
        </ThemeProvider>
    )
}