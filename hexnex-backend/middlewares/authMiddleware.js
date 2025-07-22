import jwt from 'jsonwebtoken';

// =======================
// 🔐 Protect: Require valid token
// =======================
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request
    req.user = decoded; // contains id & role
    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// =======================
// 🛡️ isAdmin: Require admin role
// =======================
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: admin only' });
};
