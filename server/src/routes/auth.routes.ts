import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

router.post(
  '/forgotpassword',
  [body('email', 'Please include a valid email').isEmail()],
  forgotPassword
);

router.put(
  '/resetpassword/:resettoken',
  [
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  resetPassword
);

// Protected routes
router.use(protect);

router.get('/me', getMe);

router.put(
  '/updatedetails',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
  ],
  updateDetails
);

router.put(
  '/updatepassword',
  [
    body('currentPassword', 'Current password is required').exists(),
    body(
      'newPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  updatePassword
);

export default router;
