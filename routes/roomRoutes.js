import express from 'express';
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRooms)       // public list rooms
  .post(protect, createRoom); // protected create

router.route('/:id')
  .get(getRoomById)    // public view single room
  .put(protect, updateRoom)   // protected update
  .delete(protect, deleteRoom); // protected delete

export default router;
