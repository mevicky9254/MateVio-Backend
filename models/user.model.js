import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    university: {
      type: String,
    },
    preferences: {
      budget: Number,
      location: String,
      pets: Boolean,
      smoking: Boolean,
      cleanliness: {
        type: String,
        enum: ['low', 'medium', 'high'],
      },
      wakeUpTime: String,
      sleepTime: String,
    },
    bio: String,
    avatar: String,
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
