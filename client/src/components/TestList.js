import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { getAllTests, deleteTest } from '../services/testService';
import TestForm from './TestForm';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const data = await getAllTests();
      setTests(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch test items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleEdit = (test) => {
    setCurrentTest(test);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setCurrentTest(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentTest(null);
  };

  const handleFormSubmit = () => {
    handleCloseForm();
    fetchTests();
  };

  const handleDeleteClick = (test) => {
    setTestToDelete(test);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTest(testToDelete._id);
      setOpenDelete(false);
      setTestToDelete(null);
      fetchTests();
    } catch (err) {
      console.error('Failed to delete test item:', err);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDelete(false);
    setTestToDelete(null);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">Test Items</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add New Item
        </Button>
      </Box>

      {tests.length === 0 ? (
        <Typography>No test items found. Add one to get started!</Typography>
      ) : (
        <Grid container spacing={3}>
          {tests.map((test) => (
            <Grid item xs={12} sm={6} md={4} key={test._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={test.imageUrl}
                  alt={test.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {test.name}
                  </Typography>
                  <Typography>
                    {test.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button size="small" color="primary" onClick={() => handleEdit(test)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDeleteClick(test)}>
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>{currentTest ? 'Edit Test Item' : 'Add New Test Item'}</DialogTitle>
        <DialogContent>
          <TestForm 
            test={currentTest} 
            onSubmitSuccess={handleFormSubmit} 
            onCancel={handleCloseForm} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{testToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestList;