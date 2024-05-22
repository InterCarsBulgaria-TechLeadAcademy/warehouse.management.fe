import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Box, ListItemIcon, ListItemText } from '@mui/material';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import { Link } from 'react-router-dom'

export default function SmallMainMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <DehazeIcon sx={{ color: 'black' }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>

                <MenuItem onClick={handleClose} sx={{
                    display: 'flex',
                }}>
                    <Box component={Link} to='users' sx={{
                        display: 'flex',
                        width: '100%',
                        color: 'black',
                        textDecoration: 'none'
                    }}>
                        <ListItemIcon>
                            <PeopleAltOutlinedIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText>Потребители</ListItemText>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleClose} sx={{
                    display: 'flex',
                }}>
                    <Box component={Link} to='zones' sx={{
                        display: 'flex',
                        width: '100%',
                        color: 'black',
                        textDecoration: 'none'
                    }}>
                        <ListItemIcon>
                            <AccountTreeOutlinedIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText>Зони</ListItemText>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleClose} sx={{
                    display: 'flex',
                }}>
                    <Box component={Link} to='vendors' sx={{
                        display: 'flex',
                        width: '100%',
                        color: 'black',
                        textDecoration: 'none'
                    }}>
                        <ListItemIcon>
                            <LocalShippingOutlinedIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText>Доставчици</ListItemText>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleClose} sx={{
                    display: 'flex',
                }}>
                    <Box component={Link} to='roles' sx={{
                        display: 'flex',
                        width: '100%',
                        color: 'black',
                        textDecoration: 'none'
                    }}>
                        <ListItemIcon>
                            <ManageAccountsOutlinedIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText>Роли</ListItemText>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleClose} sx={{
                    display: 'flex',
                }}>
                    <Box component={Link} to='typesGoods' sx={{
                        display: 'flex',
                        width: '100%',
                        color: 'black',
                        textDecoration: 'none'
                    }}>
                        <ListItemIcon>
                            <Inventory2OutlinedIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText>Видове Стока</ListItemText>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleClose} sx={{
                    display: 'flex',
                }}>
                    <Box component={Link} to='typesDifference' sx={{
                        display: 'flex',
                        width: '100%',
                        color: 'black',
                        textDecoration: 'none'
                    }}>
                        <ListItemIcon>
                            <DifferenceOutlinedIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText>Тип Разлика</ListItemText>
                    </Box>
                </MenuItem>
            </Menu>
        </div>
    );
}
