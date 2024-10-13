import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { fetchVacations, followVacation } from '../slices/vacationSlice';
import { RootState, AppDispatch } from '../store';

const VacationList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vacations = useSelector((state: RootState) => state.vacations.vacations);
  const status = useSelector((state: RootState) => state.vacations.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVacations());
    }
  }, [status, dispatch]);

  const handleFollow = (id: number) => {
    dispatch(followVacation(id));
  };

  if (status === 'loading') {
    return <div>טוען...</div>;
  }

  if (status === 'failed') {
    return <div>שגיאה בטעינת החופשות</div>;
  }

  return (
    <Grid container spacing={3}>
      {vacations.map((vacation) => (
        <Grid item xs={12} sm={6} md={4} key={vacation.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={vacation.image}
              alt={`תמונה של ${vacation.destination}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {vacation.destination}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {vacation.description}
              </Typography>
              <Typography variant="body2">
                מחיר: ₪{vacation.price}
              </Typography>
              <Typography variant="body2">
                תאריכים: {new Date(vacation.startDate).toLocaleDateString()} - {new Date(vacation.endDate).toLocaleDateString()}
              </Typography>
              <Button onClick={() => handleFollow(vacation.id)}>
                עקוב ({vacation.followersCount})
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default VacationList;
