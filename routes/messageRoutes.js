import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.use(protect);

router.post('/', sendMessage);
router.get('/:userId', getMessages);

export default router;
