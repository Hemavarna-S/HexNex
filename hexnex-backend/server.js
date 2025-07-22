import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import aiRoute from './routes/aiRoute.js';
import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config(); 

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON

// ✅ Routes
app.use('/api', authRoutes);     // Auth routes: /api/register, /api/login, etc.
app.use('/ai', aiRoute);         // AI Chatbot route: /ai/hexnexai
app.use('/api', categoriesRoutes); // Categories routes

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('🛡️ HexNex Backend is running!');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 HexNex Server running on port ${PORT}`);
});
