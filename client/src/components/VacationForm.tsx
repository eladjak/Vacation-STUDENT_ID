import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { VacationFormData } from '../types/vacation';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  initialData?: VacationFormData;
  onSubmit: (data: VacationFormData) => void;
  onCancel: () => void;
}

const VacationForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<VacationFormData>({
    defaultValues: initialData || {
      destination: '',
      description: '',
      start_date: '',
      end_date: '',
      price: 0,
      image_url: ''
    }
  });

  const startDate = watch('start_date');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="destination"
          control={control}
          rules={{ required: t('form.required') }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('vacation.destination')}
              error={!!errors.destination}
              helperText={errors.destination?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: t('form.required') }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('vacation.description')}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          rules={{
            required: t('form.required'),
            min: { value: 0, message: t('form.priceMin') }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('vacation.price')}
              error={!!errors.price}
              helperText={errors.price?.message}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="image_url"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              type="text"
              label={t('vacation.image_url')}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              error={!!errors.image_url}
              helperText={errors.image_url?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="start_date"
          control={control}
          rules={{ required: t('form.required') }}
          render={({ field: { value, onChange, ...field } }) => (
            <DatePicker
              {...field}
              label={t('vacation.start_date')}
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date?.format('YYYY-MM-DD'))}
              slotProps={{
                textField: {
                  error: !!errors.start_date,
                  helperText: errors.start_date?.message
                }
              }}
            />
          )}
        />

        <Controller
          name="end_date"
          control={control}
          rules={{
            required: t('form.required'),
            validate: (value) =>
              !startDate || !value || dayjs(value).isAfter(dayjs(startDate)) || t('form.endDateError')
          }}
          render={({ field: { value, onChange, ...field } }) => (
            <DatePicker
              {...field}
              label={t('vacation.end_date')}
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date?.format('YYYY-MM-DD'))}
              minDate={dayjs(startDate)}
              slotProps={{
                textField: {
                  error: !!errors.end_date,
                  helperText: errors.end_date?.message
                }
              }}
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onCancel} variant="outlined">
            {t('common.cancel')}
          </Button>
          <Button type="submit" variant="contained">
            {t('common.save')}
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default VacationForm;


