import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createMatch, getMatches, updateMatchStatus } from '../controllers/matchController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createMatch)
  .get(getMatches);

router.route('/:id')
  .put(updateMatchStatus);

export default router;
