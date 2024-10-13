import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchVacations, deleteVacation } from '../slices/vacationSlice';
import { RootState, AppDispatch } from '../store';
import VacationForm from './VacationForm';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vacations = useSelector((state: RootState) => state.vacations.vacations);
  const status = useSelector((state: RootState) => state.vacations.status);
  const [selectedVacation, setSelectedVacation] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVacations());
    }
  }, [status, dispatch]);

  const handleDeleteVacation = (id: number) => {
    dispatch(deleteVacation(id));
  };

  const chartData = {
    labels: vacations.map(v => v.destination),
    datasets: [
      {
        label: 'מספר עוקבים',
        data: vacations.map(v => v.followersCount),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h4">לוח בקרה למנהל</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant="h5">רשימת חופשות</Typography>
          {vacations.map(vacation => (
            <div key={vacation.id}>
              <Typography>{vacation.destination}</Typography>
              <Button onClick={() => setSelectedVacation(vacation.id)}>ערוך</Button>
              <Button onClick={() => handleDeleteVacation(vacation.id)}>מחק</Button>
            </div>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant="h5">הוסף/ערוך חופשה</Typography>
          <VacationForm vacationId={selectedVacation} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h5">גרף עוקבים</Typography>
          <Bar data={chartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
