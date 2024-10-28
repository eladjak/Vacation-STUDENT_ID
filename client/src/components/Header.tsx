import React from 'react';



import { useDispatch, useSelector } from 'react-redux';



import { AppBar, Toolbar, Typography, Button } from '@mui/material';



import { Link as RouterLink } from 'react-router-dom';



import { useTranslation } from 'react-i18next';



import { selectUser, logout } from '../features/auth/authSlice';



import { AppDispatch } from '../app/store';







const Header: React.FC = () => {



  const { t } = useTranslation();





  const dispatch = useDispatch<AppDispatch>();



  const user = useSelector(selectUser);







  const handleLogout = () => {



    dispatch(logout());



  };







  return (



    <AppBar position="static">



      <Toolbar>



        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>



          {t('vacationApp')}



        </Typography>



        {user ? (



          <>



            <Button color="inherit" component={RouterLink} to="/vacations">



              {t('vacations')}



            </Button>



            {user.role === 'admin' && (



              <Button color="inherit" component={RouterLink} to="/admin">



                {t('adminDashboard')}



              </Button>



            )}



            <Button color="inherit" onClick={handleLogout}>



              {t('logout')}



            </Button>



          </>



        ) : (



          <Button color="inherit" component={RouterLink} to="/login">



            {t('login')}



          </Button>



        )}



      </Toolbar>



    </AppBar>



  );



};







export default Header;








