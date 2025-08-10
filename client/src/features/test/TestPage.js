import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TestList from '../../components/TestList';

const TestPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Test Database
        </Typography>
        <Typography variant="body1" paragraph>
          This page demonstrates CRUD operations with MongoDB. You can create, read, update, and delete test items with image URLs, names, and descriptions.
        </Typography>
        <TestList />
      </Box>
    </Container>
  );
};

export default TestPage;