import passport from 'passport';

// Middleware to protect routes
export const protect = passport.authenticate('jwt', { session: false });

// Middleware to check for admin role
export const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};