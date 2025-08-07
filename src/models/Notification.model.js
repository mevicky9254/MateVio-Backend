import mongoose, {Schema} from 'mongoose';

const notificationSchema = new Schema({
  recipient: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
 },
  type: { 
    type: String, 
    enum: ['match', 'message', 'info']
 },

  message: String,
  
  isRead: { 
    type: Boolean, 
    default: false 
}
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;