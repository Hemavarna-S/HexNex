import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

// Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== role) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Progress: mark room complete
export const completeRoom = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { room, points } = req.body;
    if (!userId) return res.status(401).json({ message: 'Not authorized' });
    if (!room) return res.status(400).json({ message: 'Missing room identifier' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const already = user.completedRooms.some(r => r.room === room);
    if (already) return res.json({ message: 'Already completed', progress: user });

    user.completedRooms.push({ room, points: points || 0, completedAt: new Date() });
    user.totalPoints = (user.totalPoints || 0) + (points || 0);
    await user.save();

    return res.json({ message: 'Room completed', progress: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Progress: mark walkthrough/topic complete
export const completeWalkthrough = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { topic, points } = req.body;
    if (!userId) return res.status(401).json({ message: 'Not authorized' });
    if (!topic) return res.status(400).json({ message: 'Missing topic identifier' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const already = user.completedWalkthroughs.some(w => w.topic === topic);
    if (already) return res.json({ message: 'Already completed', progress: user });

    user.completedWalkthroughs.push({ topic, points: points || 0, completedAt: new Date() });
    user.totalPoints = (user.totalPoints || 0) + (points || 0);
    await user.save();

    return res.json({ message: 'Walkthrough completed', progress: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get current user's progress
export const getMyProgress = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Not authorized' });
    const user = await User.findById(userId).select('completedRooms completedWalkthroughs totalPoints name email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ progress: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};