import React from "react";
import Popover from "@mui/material/Popover";
import {Box, Button, Typography, IconButton, Divider} from "@mui/material";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


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
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 2,
                p: 1,
                borderRadius: 1,
              }}
            >
              <Button
                size="small"
                variant="contained"
                startIcon={<EditOutlinedIcon fontSize="small" />}
                onClick={() => {
                  onEdit(activity);
                  onClose();
                }}
              >
                Redigera
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                onClick={() => {
                  onDelete(activity);
                  onClose();
                }}
              >
                Ta bort
              </Button>
            </Box>
        </Popover>
    );
}

export default ActivityDialog;
