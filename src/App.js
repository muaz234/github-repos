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
        width: '25vw',      
        minWidth: '250px',    
        margin: '0 auto',    
        padding: '16px',      
      }}
    >
      <Box
        sx={{
          height: '20vh',     
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          Most Starred GitHub Repositories
        </Typography>
        <Box sx={{ marginTop: 3, marginBottom: 3, width: '100%' }}>
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
