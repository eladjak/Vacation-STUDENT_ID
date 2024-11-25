import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';
import VacationCard from './VacationCard';
import VacationForm from './VacationForm';
import { Vacation, VacationFormData } from '../types/vacation';
import {
  useGetVacationsQuery,
  useAddVacationMutation,
  useUpdateVacationMutation,
  useDeleteVacationMutation
} from '../redux/vacationApi';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  open, 
  title, 
  content, 
  onConfirm, 
  onCancel 
}) => {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button onClick={onConfirm} color="error">
          {t('common.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminVacations: React.FC = () => {
  const { t } = useTranslation();
  const { data: vacations = [], isLoading, error } = useGetVacationsQuery();
  const [addVacation] = useAddVacationMutation();
  const [updateVacation] = useUpdateVacationMutation();
  const [deleteVacation] = useDeleteVacationMutation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVacation, setEditingVacation] = useState<Vacation | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const handleAdd = async (formData: VacationFormData) => {
    try {
      await addVacation(formData).unwrap();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add vacation:', error);
    }
  };

  const handleUpdate = async (formData: VacationFormData) => {
    if (!editingVacation) return;
    
    try {
      await updateVacation({ 
        id: editingVacation.id, 
        data: formData 
      }).unwrap();
      setEditingVacation(null);
    } catch (error) {
      console.error('Failed to update vacation:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    
    try {
      await deleteVacation(deleteConfirmId).unwrap();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete vacation:', error);
    }
  };

  if (isLoading) return <Typography>{t('common.loading')}</Typography>;
  if (error) return <Typography>{t('error.loadData')}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {t('vacation.management')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddDialogOpen(true)}
        >
          {t('vacation.addVacation')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {vacations.map((vacation) => (
          <Grid item key={vacation.id} xs={12} sm={6} md={4}>
            <VacationCard
              vacation={vacation}
              onEdit={() => setEditingVacation(vacation)}
              onDelete={() => setDeleteConfirmId(vacation.id)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('vacation.addVacation')}</DialogTitle>
        <DialogContent>
          <VacationForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog 
        open={!!editingVacation} 
        onClose={() => setEditingVacation(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('vacation.editVacation')}</DialogTitle>
        <DialogContent>
          {editingVacation && (
            <VacationForm
              initialData={editingVacation}
              onSubmit={handleUpdate}
              onCancel={() => setEditingVacation(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteConfirmId}
        title={t('vacation.confirmDelete')}
        content={t('vacation.deleteMessage')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </Container>
  );
};

export default AdminVacations;








