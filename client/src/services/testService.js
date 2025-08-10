import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create a new test item
export const createTest = async (testData) => {
  try {
    const response = await axios.post(`${API_URL}/test`, testData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all test items
export const getAllTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/test`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get a single test item by ID
export const getTestById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/test/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a test item
export const updateTest = async (id, testData) => {
  try {
    const response = await axios.put(`${API_URL}/test/${id}`, testData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a test item
export const deleteTest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/test/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};