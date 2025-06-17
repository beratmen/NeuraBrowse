import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      // Open Google search in a new tab
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search the web..."
          value={searchQuery}
          onChange={handleChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBox; 