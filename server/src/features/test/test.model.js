import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Test = mongoose.model('Test', testSchema);

export default Test;