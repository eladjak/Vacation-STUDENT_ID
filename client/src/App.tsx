import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box, Container } from '@mui/material';
import Login from './components/Login';
import VacationList from './components/VacationList';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<VacationList />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </>
  );
};

export default App;
