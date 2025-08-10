import Test from './test.model.js';

// Create a new test item
export const createTest = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    
    const newTest = new Test({
      name,
      description,
      imageUrl
    });
    
    const savedTest = await newTest.save();
    
    res.status(201).json(savedTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all test items
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single test item by ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    
    if (!test) {
      return res.status(404).json({ message: 'Test item not found' });
    }
    
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a test item
export const updateTest = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl },
      { new: true, runValidators: true }
    );
    
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test item not found' });
    }
    
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a test item
export const deleteTest = async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    
    if (!deletedTest) {
      return res.status(404).json({ message: 'Test item not found' });
    }
    
    res.status(200).json({ message: 'Test item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};