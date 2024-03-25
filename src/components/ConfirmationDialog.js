import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message, confirmText, cancelText, children }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {message && <DialogContentText>{message}</DialogContentText>}
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" startIcon={<CancelIcon />}>
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="primary" startIcon={<CheckCircleIcon />} autoFocus>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    children: PropTypes.node,
};

ConfirmationDialog.defaultProps = {
    confirmText: 'Confirm',
    cancelText: 'Cancel',
};

export default ConfirmationDialog;
