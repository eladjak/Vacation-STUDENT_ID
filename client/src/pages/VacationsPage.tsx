import React from 'react';
import { Typography, Container } from '@mui/material';
import VacationList from '../components/VacationList';
import { useTranslation } from 'react-i18next';

const VacationsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('vacationList')}
      </Typography>
      <VacationList />
    </Container>
  );
};

export default VacationsPage;
