import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { fetchData } from '../hooks/FetchData';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import Header from '../components/containers/header';
import {useNavigate} from "react-router-dom";


const ProfileIcon = styled('img')(({ selected }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: selected ? '2px solid #1976d2' : 'none',
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.8,
    },
}));

function AccountSettings() {
    const { logoutAction } = useAuth();
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);
    const [taskStats, setTaskStats] = useState(null);
    const [activityStats, setActivityStats] = useState(null);
    const [profileIcon, setProfileIcon] = useState('icon1');
    const [isLoadingIcon, setIsLoadingIcon] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const navigate = useNavigate();

    const availableIcons = [
        { id: 'icon1', src: '/userIcons/icon1.png' },
        { id: 'icon2', src: '/userIcons/icon2.png' },
        { id: 'icon3', src: '/userIcons/icon3.png' },
        { id: 'icon4', src: '/userIcons/icon4.png' },
        //{ id: 'icon5', src: '/userIcons/icon5.png' },
        //{ id: 'icon6', src: '/userIcons/icon6.png' },
        //{ id: 'icon7', src: '/userIcons/icon7.png' },
        //{ id: 'icon8', src: '/userIcons/icon8.png' },
        //{ id: 'icon9', src: '/userIcons/icon9.png' },
        //{ id: 'icon10', src: '/userIcons/icon10.png' },
    ];

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await fetchData('user/me', 'GET');
                setUser(userData);
                setProfileIcon(userData.profileIcon);
            } catch (error) {
                console.error('Fel vid hämtning av användardata:', error);
            }
        };
        getUserData();
    }, []);

    useEffect(() => {
        const getTaskStats = async () => {
            try {
                const data = await fetchData('user/me/stats/tasks', 'GET');
                setTaskStats(data);
            } catch (error) {
                console.error('Fel vid hämtning av uppgiftsstatistik:', error);
                setTaskStats({ totalTasks: 0, completedTasks: 0, activeTasks: 0 });
            }
        };
        getTaskStats();
    }, []);

    useEffect(() => {
        const getActivityStats = async () => {
            try {
                const data = await fetchData('user/me/stats/activities', 'GET');
                setActivityStats(data);
            } catch (error) {
                console.error('Fel vid hämtning av aktivitetsstatistik:', error);
                setActivityStats({ totalActivitiesToday: 0, totalActivitiesThisWeek: 0, totalActivitiesThisMonth: 0, averageHoursPerWeek: 0 });
            }
        };
        getActivityStats();
    }, []);

    const handlePasswordChange = async () => {
        setIsLoadingPassword(true);
        setPasswordMessage('');
        try {
            if (!currentPassword) {
                throw new Error('Ange nuvarande lösenord.');
            }
            if (!newPassword) {
                throw new Error('Ange nytt lösenord.');
            }
            if (!confirmPassword) {
                throw new Error('Bekräfta nytt lösenord.');
            }
            if (newPassword !== confirmPassword) {
                throw new Error('Lösenorden matchar inte.');
            }
            if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
                throw new Error(
                    'Lösenordet måste vara minst 8 tecken långt och innehålla minst en stor bokstav och en siffra.'
                );
            }
            await fetchData('auth/change-password', 'PUT', { oldPassword: currentPassword, newPassword });
            setPasswordMessage('Lösenordet har ändrats.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setPasswordMessage(`Fel vid ändring av lösenord: ${error.message}`);
        } finally {
            setIsLoadingPassword(false);
        }
    };

    const handleEmailChange = async () => {
        setIsLoadingEmail(true);
        setEmailMessage('');
        try {
            if (!newEmail) {
                throw new Error('Ange en ny e-postadress.');
            }
            const updatedUser = await fetchData('auth/change-email', 'PUT', {
                password: emailPassword,
                newEmail,
            });
            setUser(updatedUser);
            setEmailMessage('E-postadressen har ändrats.');
            setNewEmail('');
            setEmailPassword('');
        } catch (error) {
            setEmailMessage('Fel vid ändring av e-post: ' + error.message);
        } finally {
            setIsLoadingEmail(false);
        }
    };

    const handleIconSelect = async (iconId) => {
        setIsLoadingIcon(true);
        try {
            const response = await fetchData('user/me/profile-icon', 'PUT', { profileIcon: iconId });
            setProfileIcon(response.profileIcon);
        } catch (error) {
            console.error('Fel vid uppdatering av profilikon:', error);
        } finally {
            setIsLoadingIcon(false);
        }
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
        setDeleteMessage('');
        setDeletePassword('');
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setDeleteMessage('');
        setDeletePassword('');
    };

    const handleDeleteAccount = async () => {
        setIsLoadingDelete(true);
        setDeleteMessage('');
        try {
            await fetchData('auth/delete-account', 'DELETE', { password: deletePassword });
            setDeleteMessage('Kontot har raderats.');
            logoutAction();
            navigate('/login');
        } catch (error) {
            setDeleteMessage('Fel vid radering av konto: ' + error.message);
        } finally {
            setIsLoadingDelete(false);
        }
    };

    if (!user) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    }

    return (
        <Box>
            <Header /> {/* Add Header */}
            <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
                <Typography variant="h4" gutterBottom>
                    Kontoinställningar
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                            <Typography variant="h6" gutterBottom>
                                Kontoinformation
                            </Typography>
                            <Typography>Användarnamn: {user.username}</Typography>
                            <Typography>E-postadress: {user.emailAddress}</Typography>
                            <TextField
                                label="Ny e-postadress"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Lösenord (för att bekräfta)"
                                type="password"
                                value={emailPassword}
                                onChange={(e) => setEmailPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEmailChange}
                                disabled={isLoadingEmail}
                                sx={{ mt: 2 }}
                            >
                                {isLoadingEmail ? <CircularProgress size={24} /> : 'Ändra e-post'}
                            </Button>
                            {emailMessage && (
                                <Typography
                                    color={emailMessage.includes('ändrats') ? 'success.main' : 'error'}
                                    sx={{ mt: 2 }}
                                >
                                    {emailMessage}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                            <Typography variant="h6" gutterBottom>
                                Profilikon
                            </Typography>
                            <Grid container spacing={2}>
                                {availableIcons.map((icon) => (
                                    <Grid item key={icon.id}>
                                        <IconButton
                                            onClick={() => handleIconSelect(icon.id)}
                                            disabled={isLoadingIcon}
                                        >
                                            <ProfileIcon
                                                src={icon.src}
                                                alt={icon.id}
                                                selected={profileIcon === icon.id}
                                            />
                                        </IconButton>
                                    </Grid>
                                ))}
                            </Grid>
                            {isLoadingIcon && <CircularProgress size={24} sx={{ mt: 2 }} />}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                            <Typography variant="h6" gutterBottom>
                                Ändra Lösenord
                            </Typography>
                            <TextField
                                label="Nuvarande Lösenord"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Nytt Lösenord"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Bekräfta Nytt Lösenord"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePasswordChange}
                                disabled={isLoadingPassword}
                                sx={{ mt: 2 }}
                            >
                                {isLoadingPassword ? <CircularProgress size={24} /> : 'Ändra Lösenord'}
                            </Button>
                            {passwordMessage && (
                                <Typography
                                    color={passwordMessage.includes('ändrats') ? 'success.main' : 'error'}
                                    sx={{ mt: 2 }}
                                >
                                    {passwordMessage}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                            <Typography variant="h6" gutterBottom>
                                Statistik över kontot
                            </Typography>
                            {taskStats ? (
                                <>
                                    <Typography>Totala Uppgifter: {taskStats.totalTasks}</Typography>
                                    <Typography>Slutförda Uppgifter: {taskStats.completedTasks}</Typography>
                                    <Typography>Aktiva Uppgifter: {taskStats.activeTasks}</Typography>
                                </>
                            ) : (
                                <Typography>Laddar uppgiftsstatistik...</Typography>
                            )}
                            {activityStats ? (
                                <>
                                    <Typography>Totala Aktiviteter Idag: {activityStats.totalActivitiesToday}</Typography>
                                    <Typography>Totala Aktiviteter Denna Veckan: {activityStats.totalActivitiesThisWeek}</Typography>
                                    <Typography>Totala Aktiviteter Denna Månaden: {activityStats.totalActivitiesThisMonth}</Typography>
                                    <Typography>Genomsnittliga timmar per vecka: {activityStats.averageHoursPerWeek}</Typography>
                                </>
                            ) : (
                                <Typography>Laddar aktivitetsstatistik...</Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                            <Typography variant="h6" gutterBottom>
                                Inloggningshistorik
                            </Typography>
                            <Typography color="text.secondary">
                                Kommer snart...
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                            <Typography variant="h6" gutterBottom>
                                Radera konto
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleOpenDeleteDialog}
                                sx={{ mt: 2 }}
                            >
                                Radera mitt konto
                            </Button>
                            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                                <DialogTitle>Bekräfta radering av konto</DialogTitle>
                                <DialogContent>
                                    <Typography>
                                        Är du säker på att du vill radera ditt konto? Denna åtgärd kan inte ångras.
                                    </Typography>
                                    <TextField
                                        label="Lösenord (för att bekräfta)"
                                        type="password"
                                        value={deletePassword}
                                        onChange={(e) => setDeletePassword(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    {deleteMessage && (
                                        <Typography
                                            color={deleteMessage.includes('raderats') ? 'success.main' : 'error'}
                                            sx={{ mt: 2 }}
                                        >
                                            {deleteMessage}
                                        </Typography>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDeleteDialog}>Avbryt</Button>
                                    <Button
                                        onClick={handleDeleteAccount}
                                        color="error"
                                        disabled={isLoadingDelete}
                                    >
                                        {isLoadingDelete ? <CircularProgress size={24} /> : 'Radera'}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default AccountSettings;