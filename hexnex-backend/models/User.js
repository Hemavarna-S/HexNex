import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  // Progress tracking
  completedRooms: [
    {
      room: { type: String, required: true },
      points: { type: Number, default: 0 },
      completedAt: { type: Date, default: Date.now }
    }
  ],
  completedWalkthroughs: [
    {
      topic: { type: String, required: true },
      points: { type: Number, default: 0 },
      completedAt: { type: Date, default: Date.now }
    }
  ],
  totalPoints: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);