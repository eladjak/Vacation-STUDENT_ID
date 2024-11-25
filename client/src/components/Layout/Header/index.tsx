import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuth } from '../../../contexts/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" dir="rtl">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            {t('header.home')}
          </Button>

          {isAdmin && (
            <Button color="inherit" onClick={() => navigate('/admin')}>
              {t('header.admin')}
            </Button>
          )}
        </Box>

        <Box>
          {user ? (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                {t('header.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                {t('header.login')}
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                {t('header.register')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 