import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchData } from '../../hooks/FetchData';
import {
    Dialog,
    DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Box,
} from '@mui/material';
import { styled } from '@mui/system';

const ProfileIcon = styled('img')({
    width: 40,
    height: 40,
    borderRadius: '50%',
});

function ProfilePopUpFrame({ open, onClose, anchorEl }) {
    const { logoutAction } = useAuth();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    const handleLogout = () => {
        onClose();
        logoutAction();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    minWidth: '200px',
                    position: 'absolute',
                    zIndex: 1300,
                    top: anchorEl ? anchorEl.getBoundingClientRect().bottom + 10 : 0,
                    right: anchorEl
                        ? window.innerWidth - anchorEl.getBoundingClientRect().right + 10
                        : 0,
                    margin: 0,
                    borderRadius: '4px 0 4px 4px',
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-8px',
                        right: '8px',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid white',
                        zIndex: 1301,
                    },
                },
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/account-settings')}>
                            <ListItemText primary="Kontoinställningar" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/system-settings')}>
                            <ListItemText primary="Systeminställningar" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Logga ut" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}

function ProfileIconComponent() {
    const [open, setOpen] = useState(false);
    const [profileIcon, setProfileIcon] = useState('/userIcons/icon1.png');
    const iconRef = useRef(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getProfileIcon = async () => {
            try {
                const data = await fetchData('/user/me/profile-icon', 'GET');
                setProfileIcon(`/userIcons/${data.profileIcon}.png`);
            } catch (error) {
                console.error('Fel vid hämtning av profilikon:', error);
            }
        };
        getProfileIcon();
    }, []);

    return (
        <Box>
            <IconButton onClick={handleOpen} ref={iconRef} sx={{ p: 0 }}>
                <ProfileIcon src={profileIcon} alt="Profil Ikon" />
            </IconButton>
            <ProfilePopUpFrame
                open={open}
                onClose={handleClose}
                anchorEl={iconRef.current}
            />
        </Box>
    );
}

export default ProfileIconComponent;