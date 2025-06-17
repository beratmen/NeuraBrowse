import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography } from '@mui/material';
import SearchBox from './components/SearchBox';
import AnalysisDashboard from './components/AnalysisDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const handleSearch = (query: string): void => {
    // Handle search functionality
    console.log('Search query:', query);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            NeuraBrowse
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
            Your Personalized Web Experience
          </Typography>
          <SearchBox onSearch={handleSearch} />
          <AnalysisDashboard />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App; 