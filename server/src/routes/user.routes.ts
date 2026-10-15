import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { Request, Response } from 'express';
import User from '../models/user.model';

const router = Router();

// All routes are protected
router.use(protect);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Search users (for adding collaborators)
// @route   GET /api/users/search
// @access  Private
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    })
      .select('name email avatar')
      .limit(10);

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
