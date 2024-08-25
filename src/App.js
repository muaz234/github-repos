import React, { useState } from 'react';
import './App.css';
import GitHubRepos from './GitHubRepos';
import { Select, MenuItem, Box, Typography, FormControl, InputLabel } from '@mui/material';

function App() {
  const [days, setDays] = useState(10);

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  return (
    <Box
      sx={{
        width: '90%',      
        maxWidth: '600px',    
        margin: '0 auto',    
        padding: '16px',      
        boxSizing: 'border-box', // Ensures padding is included in width calculation
      }}
    >
      <Box
        sx={{
          height: 'auto',     
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" component="h1" align="center" sx={{ marginBottom: 2 }}>
          Most Starred GitHub Repositories
        </Typography>
        <Box sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="days-select-label">Number of days</InputLabel>
            <Select
              labelId="days-select-label"
              id="days-select"
              value={days}
              onChange={handleDaysChange}
              label="Number of days"
            >
              <MenuItem value={10}>10 Days</MenuItem>
              <MenuItem value={20}>20 Days</MenuItem>
              <MenuItem value={30}>30 Days</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <GitHubRepos days={days} />
    </Box>
  );
}

export default App;