import React, { useState } from 'react';



import { useDispatch, useSelector } from 'react-redux';



import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';



import { Visibility, VisibilityOff } from '@mui/icons-material';



import { useTranslation } from 'react-i18next';



import { login, selectAuthError, selectAuthStatus } from '../features/auth/authSlice';



import { AppDispatch } from '../app/store';







const Login: React.FC = () => {



  const { t } = useTranslation();



  const dispatch = useDispatch<AppDispatch>();



  const [username, setUsername] = useState('');



  const [password, setPassword] = useState('');



  const [showPassword, setShowPassword] = useState(false);





  const error = useSelector(selectAuthError);



  const status = useSelector(selectAuthStatus);







  const handleSubmit = (e: React.FormEvent) => {



    e.preventDefault();



    dispatch(login({ username, password }));



  };







  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };







  return (



    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>



      <TextField



        margin="normal"



        required



        fullWidth



        id="username"



        label={t('username')}



        name="username"



        autoComplete="username"



        autoFocus



        value={username}



        onChange={(e) => setUsername(e.target.value)}



      />



      <TextField



        margin="normal"



        required



        fullWidth



        name="password"



        label={t('password')}



        type={showPassword ? 'text' : 'password'}



        id="password"



        autoComplete="current-password"



        value={password}



        onChange={(e) => setPassword(e.target.value)}



        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />



      <Button



        type="submit"



        fullWidth



        variant="contained"



        sx={{ mt: 3, mb: 2 }}



        disabled={status === 'loading'}



      >



        {status === 'loading' ? t('loggingIn') : t('login')}



      </Button>



      {error && (



        <Typography color="error" align="center">



          {error}



        </Typography>



      )}



    </Box>



  );



};







export default Login;








