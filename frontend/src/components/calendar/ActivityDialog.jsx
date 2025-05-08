import React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography, IconButton } from "@mui/material";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


function ActivityDialog({
                            anchorEl,
                            open,
                            onClose,
                            activity,
                            placement = 'right',
                            onEdit,
                            onDelete
                        }) {
    if (!anchorEl || !activity) return null;

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: placement === 'right' ? 'right' : 'left'
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: placement === 'right' ? 'left' : 'right'
            }}
            PaperProps={{
                sx: {
                    overflow: 'visible',
                    p: 2,
                    width: 320,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        [placement === 'right' ? 'left' : 'right']: -8,
                        transform: 'translateY(-50%)',
                        border: '8px solid transparent',
                        ...(placement === 'right'
                            ? { borderRightColor: 'background.paper' }
                            : { borderLeftColor: 'background.paper' }),
                    }
                }
            }}
        >
            {/* Delete Icon */}
            <IconButton
                onClick={() => {
                    onDelete(activity);
                    onClose();
                }}
                sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }}
                size="small"
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>

            {/* Content */}
            <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {activity.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {activity.date} • {dayjs(`1970-01-01T${activity.startTime}`).format('HH:mm')} – {dayjs(`1970-01-01T${activity.endTime}`).format('HH:mm')}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }} noWrap>
                    {activity.description || 'Ingen beskrivning'}
                </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button
                    size="small"
                    variant="text"
                    onClick={() => {
                        onEdit(activity);
                        onClose();
                    }}
                >
                    Redigera
                </Button>
            </Box>
        </Popover>
    );
}

export default ActivityDialog;
