import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      onSearch(searchQuery);
      
      // Open Google search in a new tab
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
      
      // Reset the search query after a short delay
      setTimeout(() => {
        setSearchQuery('');
        setIsSearching(false);
      }, 500);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3,
        background: 'linear-gradient(145deg, rgba(25,118,210,0.05) 0%, rgba(220,0,78,0.05) 100%)',
      }}
    >
      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search the web and track your interests..."
          value={searchQuery}
          onChange={handleChange}
          disabled={isSearching}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TravelExploreIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSearching || !searchQuery.trim()}
          startIcon={<SearchIcon />}
          sx={{ 
            minWidth: 120,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBox; 