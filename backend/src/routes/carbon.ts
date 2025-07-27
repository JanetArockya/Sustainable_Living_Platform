import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, (req, res) => {
  res.status(200).json({ success: true, message: 'Carbon tracking endpoints' });
});

export default router;
