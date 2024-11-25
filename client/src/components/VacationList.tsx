import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';
import VacationCard from './VacationCard';
import { Vacation } from '../types/vacation';

interface Props {
  vacations: Vacation[];
  onEdit?: (vacation: Vacation) => void;
  onDelete?: (id: number) => void;
}

const VacationList: React.FC<Props> = ({ vacations, onEdit, onDelete }) => {
  const { t } = useTranslation();

  if (!vacations.length) {
    return (
      <Typography align="center" color="textSecondary">
        {t('vacation.noVacations')}
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {vacations.map((vacation) => (
        <Grid item key={vacation.id} xs={12} sm={6} md={4}>
          <VacationCard
            vacation={vacation}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default VacationList;