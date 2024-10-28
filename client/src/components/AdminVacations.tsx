import React, { useEffect, useState } from 'react';































import { useSelector, useDispatch } from 'react-redux';































import { fetchVacations, deleteVacation, addVacation, updateVacation, Vacation } from '../redux/vacationSlice';































import { RootState, AppDispatch } from '../redux/store';































import VacationForm from './VacationForm';































import { 

  Table, 

  TableBody, 

  TableCell, 

  TableContainer, 

  TableHead, 

  TableRow, 

  Paper, 

  Button, 

  Typography 

} from '@mui/material';































import { useTranslation } from 'react-i18next';































const AdminVacations: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();

  const vacations = useSelector((state: RootState) => state.vacations.vacations);

  const status = useSelector((state: RootState) => state.vacations.status);

  const [editingVacation, setEditingVacation] = useState<Vacation | null>(null);





  useEffect(() => {

    if (status === 'idle') {

      dispatch(fetchVacations());

    }

  }, [status, dispatch]);



  const handleDelete = (id: number) => {

    if (window.confirm(t('confirmDelete'))) {

      dispatch(deleteVacation(id));

    }

  };



  const handleSubmit = (vacation: Vacation) => {

    if (editingVacation) {

      dispatch(updateVacation(vacation));

    } else {

      dispatch(addVacation(vacation));

    }

    setEditingVacation(null);

  };



  if (status === 'loading') {

    return <Typography>{t('loading')}</Typography>;

  }



  return (

    <div>

      <Typography variant="h4" gutterBottom>{t('adminVacations')}</Typography>

      <VacationForm 
        vacationId={editingVacation?.id} 
        onSubmit={handleSubmit}
        initialData={editingVacation}
      />

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>{t('destination')}</TableCell>

              <TableCell>{t('description')}</TableCell>

              <TableCell>{t('startDate')}</TableCell>

              <TableCell>{t('endDate')}</TableCell>

              <TableCell>{t('price')}</TableCell>

              <TableCell>{t('actions')}</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {vacations.map((vacation: Vacation) => (

              <TableRow key={vacation.id}>

                <TableCell>{vacation.destination}</TableCell>

                <TableCell>{vacation.description}</TableCell>

                <TableCell>{vacation.startDate}</TableCell>

                <TableCell>{vacation.endDate}</TableCell>

                <TableCell>{vacation.price}</TableCell>

                <TableCell>

                  <Button onClick={() => setEditingVacation(vacation)}>{t('edit')}</Button>

                  <Button onClick={() => handleDelete(vacation.id)}>{t('delete')}</Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </div>

  );

};





export default AdminVacations;



