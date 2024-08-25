import React, { useEffect, useState } from 'react';
import { List, ListItem, Card, CardContent, Typography, Link, Button, Box, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios'; 

const GitHubRepos = ({ days }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // change to page 1 when days change
    setPage(1);
  }, [days]);

  useEffect(() => {
    const fetchRepos = async () => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      const formattedDate = date.toISOString().split('T')[0];

      try {
        setLoading(true);
        const response = await axios.get(
            `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${page}&per_page=10`
          );
          const data = response?.data;
          setRepos(data?.items);
          setTotalCount(data?.total_count);
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [days, page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }
  

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />
        <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>
          Error: {error}
        </Typography>
      </Box>
    );
  }  

  return (
    <Box>
      <List>
        {repos.map(repo => (
          <ListItem key={repo?.id} disablePadding>
             <Card sx={{ width: '100%', marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={repo?.owner?.avatar_url}
                  alt={repo?.owner?.login}
                  sx={{ width: 50, height: 50, borderRadius: '50%', marginRight: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div">
                    {repo?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {repo?.description}
                  </Typography>
                </Box>
               
              </CardContent>
              <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={repo?.html_url} target="_blank" rel="noopener" variant="body2">
                  View Repository
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ marginRight: 0.5 }} /> {repo?.stargazers_count}
                </Box>
              </Box>
            </Card>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <Typography variant="body2" sx={{ alignSelf: 'center' }}>
          Page {page}
        </Typography>
        <Button variant="contained" onClick={handleNextPage} disabled={page * 10 >= totalCount}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default GitHubRepos;