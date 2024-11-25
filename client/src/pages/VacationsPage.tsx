import React from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useGetVacationsQuery } from '../redux/slices/apiSlice';
import { VacationList } from '../components';
import logger from '../utils/logger';

const VacationsPage: React.FC = () => {
  const { data: vacations, error, isLoading } = useGetVacationsQuery({});

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    logger.error('שגיאה בטעינת חופשות:', error);
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        שגיאה בטעינת החופשות. אנא נסה שוב מאוחר יותר.
      </Alert>
    );
  }

  return <VacationList vacations={vacations || []} />;
};

export default VacationsPage;


