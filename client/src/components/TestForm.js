import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import { createTest, updateTest } from '../services/testService';

const TestForm = ({ test, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (test) {
      setFormData({
        name: test.name || '',
        description: test.description || '',
        imageUrl: test.imageUrl || ''
      });
    }
  }, [test]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (test) {
        await updateTest(test._id, formData);
      } else {
        await createTest(formData);
      }
      onSubmitSuccess();
    } catch (err) {
      setError(err.message || 'An error occurred while saving the test item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoFocus
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="imageUrl"
        label="Image URL"
        name="imageUrl"
        placeholder="https://example.com/image.jpg"
        value={formData.imageUrl}
        onChange={handleChange}
        disabled={loading}
      />

      <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={loading}
          sx={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ flex: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : (test ? 'Update' : 'Create')}
        </Button>
      </Stack>
    </Box>
  );
};

export default TestForm;