import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress } from '@mui/material';
import { login, selectAuthStatus, selectAuthError } from '../redux/authSlice';
import { AppDispatch } from '../redux/store';
import { useTranslation } from 'react-i18next';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t('usernameRequired')),
      password: Yup.string().required(t('passwordRequired')),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label={t('username')}
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        margin="normal"
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label={t('password')}
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? <CircularProgress size={24} /> : t('login')}
      </Button>
    </form>
  );
};

export default LoginForm;
