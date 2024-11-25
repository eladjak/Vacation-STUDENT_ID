import React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from '../hooks/useTranslation';
import { Vacation } from '../types/vacation';

interface Props {
  vacations: Vacation[];
}

const VacationStats: React.FC<Props> = ({ vacations }) => {
  const { t } = useTranslation();

  const chartData = {
    labels: vacations.map(v => v.destination),
    datasets: [
      {
        label: t('vacation.followers'),
        data: vacations.map(v => v.followers_count),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: t('vacation.stats')
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {t('vacation.stats')}
      </Typography>
      <Box sx={{ height: '400px' }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default VacationStats; 