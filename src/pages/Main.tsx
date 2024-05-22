import { Box } from "@mui/material";
import { MainMenu } from "../../components/MainMenu";
import { ProfileMenu } from "../../components/ProfileMenu";
import useMediaQuery from '@mui/material/useMediaQuery';
import { SmallMainMenu } from "../../components/SmallMainMenu";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
import { Flag } from "../../components/Flag";
// import { Vendors } from "../Vendors/Vendors";

export default function Main() {
    const isSmallScreen = useMediaQuery('(max-width: 800px)');
    const [isHideMenu, setIsHideMenu] = useState(false)

    function hideMenuHandler() {
        setIsHideMenu(true)
    }

    function showMenuHandler() {
        setIsHideMenu(false)
    }

    return (
        <>
            <Box component="section" sx={{
                display: 'flex',
            }}>

                {isSmallScreen
                    ? null
                    : <Box component="div" sx={{ display: 'flex' }}>

                        <Box component="article" sx={{
                            display: 'flex'
                        }}>
                            {isHideMenu
                                ? <ArrowForwardIosIcon onClick={showMenuHandler} sx={{
                                    alignSelf: 'center',
                                    height: '100vh'
                                }} />
                                : <>
                                    <MainMenu />
                                    <ArrowBackIosNewIcon onClick={hideMenuHandler} sx={{ alignSelf: 'center' }} />
                                </>
                            }
                        </Box>
                    </Box>
                }

                <Box component="article" sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    <Box component="nav" sx={{
                        display: 'flex',
                        justifyContent: isSmallScreen ? 'space-between' : 'flex-end',
                        alignItems: 'center',
                        padding: '0.8em 0 0.8em 0',
                        boxShadow: '5px 5px 10px darkgray;',
                        zIndex: 1
                    }}>

                        {isSmallScreen
                            ? <Box component="div">
                                <SmallMainMenu />
                            </Box>
                            : null}

                        <Box component="div" sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>

                            <Flag />

                            <Box component="div" sx={{display: 'flex', alignItems: 'center'}}>
                                <ProfileMenu />
                            </Box>

                        </Box>
                    </Box>

                    <Box component="div" sx={{
                        flexGrow: 1,
                        height: isSmallScreen ? '100vh' : 'auto',
                        background: '#e6e6e6',
                    }}>
                        {/* <Routes>
                            <Route path="vendors" element={<Vendors />} />
                        </Routes> */}
                    </Box>
                </Box>
            </Box >
        </>
    )
}
