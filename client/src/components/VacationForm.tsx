import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Grid } from '@mui/material';
import { Vacation } from '../redux/vacationSlice';

interface VacationFormProps {
  vacationId?: number;
  onSubmit: (vacation: Vacation) => void;
  initialData?: Vacation | null;
}

const VacationForm: React.FC<VacationFormProps> = ({ vacationId, onSubmit, initialData }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Vacation>({
    id: 0,
    destination: '',
    description: '',
    startDate: '',
    endDate: '',
    price: 0,
    image: '',
    followersCount: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: 0,
        destination: '',
        description: '',
        startDate: '',
        endDate: '',
        price: 0,
        image: '',
        followersCount: 0
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="destination"
            label={t('destination')}
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label={t('description')}
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="startDate"
            label={t('startDate')}
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="endDate"
            label={t('endDate')}
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="price"
            label={t('price')}
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="image"
            label={t('imageUrl')}
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {vacationId ? t('updateVacation') : t('addVacation')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VacationForm;
