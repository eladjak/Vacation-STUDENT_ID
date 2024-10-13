import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createVacation, updateVacation } from '../slices/vacationSlice';
import { RootState, AppDispatch } from '../store';

interface VacationFormProps {
  vacationId: number | null;
}

const VacationForm: React.FC<VacationFormProps> = ({ vacationId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const vacations = useSelector((state: RootState) => state.vacations.vacations);
  const selectedVacation = vacations.find(v => v.id === vacationId);

  const validationSchema = Yup.object({
    destination: Yup.string().required('שדה חובה'),
    description: Yup.string().required('שדה חובה'),
    image: Yup.string().required('שדה חובה'),
    startDate: Yup.date().required('שדה חובה'),
    endDate: Yup.date().required('שדה חובה'),
    price: Yup.number().positive('המחיר חייב להיות חיובי').required('שדה חובה'),
  });

  const formik = useFormik({
    initialValues: {
      destination: '',
      description: '',
      image: '',
      startDate: null,
      endDate: null,
      price: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (vacationId) {
        dispatch(updateVacation({ id: vacationId, ...values }));
      } else {
        dispatch(createVacation(values));
      }
    },
  });

  useEffect(() => {
    if (selectedVacation) {
      formik.setValues({
        destination: selectedVacation.destination,
        description: selectedVacation.description,
        image: selectedVacation.image,
        startDate: new Date(selectedVacation.startDate),
        endDate: new Date(selectedVacation.endDate),
        price: selectedVacation.price.toString(),
      });
    }
  }, [selectedVacation]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="destination"
              name="destination"
              label="יעד"
              value={formik.values.destination}
              onChange={formik.handleChange}
              error={formik.touched.destination && Boolean(formik.errors.destination)}
              helperText={formik.touched.destination && formik.errors.destination}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="תיאור"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="image"
              name="image"
              label="קישור לתמונה"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="תאריך התחלה"
              value={formik.values.startDate}
              onChange={(value) => formik.setFieldValue('startDate', value)}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="תאריך סיום"
              value={formik.values.endDate}
              onChange={(value) => formik.setFieldValue('endDate', value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="מחיר"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {vacationId ? 'עדכן חופשה' : 'הוסף חופשה'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default VacationForm;
