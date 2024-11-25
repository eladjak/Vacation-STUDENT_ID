import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', direction: 'rtl' }}>
      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children || <Outlet />}
      </Container>
    </Box>
  );
};

export default Layout; 