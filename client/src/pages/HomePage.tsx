import React from 'react';
import { Typography, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        ברוכים הבאים לאפליקציית ניהול החופשות
      </Typography>
      <Typography variant="body1">
        כאן תוכלו לצפות, להוסיף ולנהל את החופשות שלכם.
      </Typography>
    </Container>
  );
};

export default HomePage;
