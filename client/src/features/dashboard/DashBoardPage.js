import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        const [userRes, aiRes] = await Promise.all([
          api.get('/data/user'),
          api.get('/data/ai-insight'),
        ]);
        if (!active) return;
        setUserData(userRes.data);
        setAiInsight(aiRes.data);
      } catch (error) {
        console.error('Failed to fetch protected data', error);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        {user && (
          <Typography variant="h6">
            Welcome, {user.email}! Your role is: {user.role}
          </Typography>
        )}
        <Button variant="contained" onClick={logout} sx={{ mt: 2 }}>
          Logout
        </Button>

        {loading? <CircularProgress sx={{mt: 4}} /> : (
          <>
            <Box sx={{ mt: 4, p: 2, border: '1px dashed grey' }}>
              <Typography variant="h6">Protected User Data:</Typography>
              <pre>{JSON.stringify(userData, null, 2)}</pre>
            </Box>

            <Box sx={{ mt: 4, p: 2, border: '1px dashed grey' }}>
              <Typography variant="h6">Your AI Insight:</Typography>
              <pre>{JSON.stringify(aiInsight, null, 2)}</pre>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default DashboardPage;