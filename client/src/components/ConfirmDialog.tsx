import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    title: string;
    content: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<Props> = ({ open, title, content, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>
                    {t('common.cancel')}
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    {t('common.delete')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog; 