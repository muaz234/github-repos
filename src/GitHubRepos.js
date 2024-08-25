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
    // Change to page 1 when days change
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
      }}
    >
      <List sx={{ padding: 0 }}>
        {repos.map(repo => (
          <ListItem key={repo?.id} disablePadding sx={{ marginBottom: { xs: 2, sm: 3 } }}>
            <Card
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginBottom: { xs: 2, md: 1 }, // Responsive margin bottom
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                }}
              >
                <Box
                  component="img"
                  src={repo?.owner?.avatar_url}
                  alt={repo?.owner?.login}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    mb: { xs: 2, sm: 0 },
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {repo?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {repo?.description}
                  </Typography>
                </Box>
              </CardContent>
              <Box
                sx={{
                  padding: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                <Link href={repo?.html_url} target="_blank" rel="noopener" variant="body2">
                  View Repository
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StarIcon sx={{ marginRight: 0.5 }} /> {repo?.stargazers_count}
                </Box>
              </Box>
            </Card>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <Typography variant="body2" sx={{ alignSelf: 'center', textAlign: { xs: 'center', sm: 'left' } }}>
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
