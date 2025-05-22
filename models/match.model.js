import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    compatibilityScore: { type: Number, min: 0, max: 100 },
    status: {
      type: String,
      enum: ['pending', 'matched', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema);
export default Match;
