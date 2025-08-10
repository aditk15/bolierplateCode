import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '../.env') });

// Verify environment variables
import './utils/verifyEnv.js';

// import modules that depend on env vars
import connectDB from './config/db.js';
import configurePassport from './config/passport.js';

// Import routes
import authRoutes from './features/auth/auth.routes.js';
import protectedRoutes from './features/protected/protected.routes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// Configure Passport (now that JWT_SECRET is loaded)
configurePassport();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});