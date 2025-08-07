import mongoose, {Schema} from 'mongoose';

const matchSchema = new Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    matchScore: Number,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema);

