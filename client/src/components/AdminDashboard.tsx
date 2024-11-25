import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import VacationForm from './VacationForm';
import VacationStats from './VacationStats';
import { useGetVacationsQuery } from '../redux/vacationApi';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: vacations = [] } = useGetVacationsQuery();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormOpen(true)}
        >
          {t('vacation.addVacation')}
        </Button>
      </Box>
      
      {isFormOpen && (
        <VacationForm
          onSubmit={async () => {
            setIsFormOpen(false);
          }}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      
      <VacationStats vacations={vacations} />
    </Box>
  );
};

export default AdminDashboard;


















































































