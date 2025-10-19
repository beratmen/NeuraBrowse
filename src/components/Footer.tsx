import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        px: 2,
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {currentYear} NeuraBrowse. Built with ❤️ using React & TypeScript
      </Typography>
      <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
        Your data is stored locally and never sent to any server
      </Typography>
    </Box>
  );
};

export default Footer;
