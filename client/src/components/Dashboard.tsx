import React, { useState } from 'react';
import { Container, Typography, Box, Switch, FormControlLabel } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';
import { useGetVacationsQuery } from '../redux/vacationApi';
import VacationList from './VacationList';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [showFollowedOnly, setShowFollowedOnly] = useState(false);
  const { data: vacations = [], isLoading, error } = useGetVacationsQuery();

  const filteredVacations = showFollowedOnly
    ? vacations.filter(vacation => vacation.is_followed)
    : vacations;

  if (isLoading) return <Typography>{t('common.loading')}</Typography>;
  if (error) return <Typography>{t('error.loadData')}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('vacation.list')}
        </Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={showFollowedOnly}
              onChange={(e) => setShowFollowedOnly(e.target.checked)}
            />
          }
          label={t('vacation.showFollowedOnly')}
        />
      </Box>

      <VacationList vacations={filteredVacations} />
    </Container>
  );
};

export default Dashboard; 