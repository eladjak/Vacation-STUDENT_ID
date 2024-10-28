import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 2, bgcolor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} אפליקציית החופשות שלנו
      </Typography>
    </Box>
  );
};

export default Footer;
