import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useTranslation } from '../../hooks/useTranslation';

interface LoginFormData {
  username: string;
  password: string;
}

interface Props {
  onSubmit: (data: LoginFormData) => void;
  error?: string;
}

const LoginForm: React.FC<Props> = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        label={t('auth.username')}
        name="username"
        margin="normal"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label={t('auth.password')}
        type="password"
        name="password"
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {t('auth.submit')}
      </Button>
    </Box>
  );
};

export default LoginForm; 