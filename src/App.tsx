import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  AppBar, 
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BackupIcon from '@mui/icons-material/Backup';
import SearchBox from './components/SearchBox';
import AnalysisDashboard from './components/AnalysisDashboard';
import Footer from './components/Footer';
import DataManagementDialog from './components/DataManagementDialog';
import { storage } from './utils/storage';
import { analytics } from './utils/analytics';
import { SearchRecord, Interest, BrowsingStats, DailyActivity } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([]);
  const [stats, setStats] = useState<BrowsingStats>({
    totalSearches: 0,
    uniqueTopics: 0,
    averagePerDay: 0,
    topInterests: [],
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dataDialogOpen, setDataDialogOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      const history = storage.getSearchHistory();
      const activity = storage.getDailyActivity();
      const calculatedInterests = analytics.calculateInterests(history);
      const calculatedStats = analytics.calculateStats(history, calculatedInterests);

      setSearchHistory(history);
      setDailyActivity(activity);
      setInterests(calculatedInterests);
      setStats(calculatedStats);
    };

    loadData();

    // Load theme preference
    const savedMode = localStorage.getItem('neurabrowse_theme') as 'light' | 'dark';
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1976d2' : '#90caf9',
          },
          secondary: {
            main: mode === 'light' ? '#dc004e' : '#f48fb1',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [mode]
  );

  // Toggle theme
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('neurabrowse_theme', newMode);
  };

  // Handle search
  const handleSearch = (query: string): void => {
    const newSearch = storage.addSearch(query);
    storage.updateDailyActivity();

    // Update state
    const updatedHistory = [newSearch, ...searchHistory].slice(0, 100);
    const updatedActivity = storage.getDailyActivity();
    const updatedInterests = analytics.calculateInterests(updatedHistory);
    const updatedStats = analytics.calculateStats(updatedHistory, updatedInterests);

    setSearchHistory(updatedHistory);
    setDailyActivity(updatedActivity);
    setInterests(updatedInterests);
    setStats(updatedStats);
  };

  // Clear all data
  const handleClearData = () => {
    setAnchorEl(null);
    if (window.confirm('Are you sure you want to clear all browsing data? This action cannot be undone.')) {
      storage.clearAll();
      setSearchHistory([]);
      setDailyActivity(storage.getDailyActivity());
      setInterests([]);
      setStats({
        totalSearches: 0,
        uniqueTopics: 0,
        averagePerDay: 0,
        topInterests: [],
      });
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDataManagement = () => {
    setAnchorEl(null);
    setDataDialogOpen(true);
  };

  const handleDataImported = () => {
    // Reload data after import
    const history = storage.getSearchHistory();
    const activity = storage.getDailyActivity();
    const calculatedInterests = analytics.calculateInterests(history);
    const calculatedStats = analytics.calculateStats(history, calculatedInterests);

    setSearchHistory(history);
    setDailyActivity(activity);
    setInterests(calculatedInterests);
    setStats(calculatedStats);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            🧠 NeuraBrowse
          </Typography>
          <Tooltip title="More options">
            <IconButton color="inherit" onClick={handleMenuOpen} sx={{ mr: 1 }}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleDataManagement}>
              <ListItemIcon>
                <BackupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Export/Import Data</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClearData}>
              <ListItemIcon>
                <DeleteSweepIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Clear All Data</ListItemText>
            </MenuItem>
          </Menu>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Your Personalized Web Experience
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Track your searches, analyze your interests, and discover personalized content
          </Typography>
          <SearchBox onSearch={handleSearch} />
          <AnalysisDashboard 
            searchHistory={searchHistory}
            interests={interests}
            dailyActivity={dailyActivity}
            stats={stats}
          />
        </Box>
        <Footer />
      </Container>
      <DataManagementDialog
        open={dataDialogOpen}
        onClose={() => setDataDialogOpen(false)}
        onDataImported={handleDataImported}
      />
    </ThemeProvider>
  );
};

export default App; 