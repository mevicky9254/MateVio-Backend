import mongoose, { Schema } from 'mongoose';

/**
 * Sub-schema for tracking message delivery and read status per user.
 * This allows for detailed tracking in group chats.
 */
const DeliveryStatusSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveredAt: {
        type: Date
    },
    readAt: {
        type: Date
    }
}, { _id: false });

/**
 * Sub-schema for rich media content such as images, videos, and audio files.
 */
const MediaAttachmentSchema = new Schema({
    type: {
        type: String,
        enum: ['image', 'video', 'audio', 'file'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    filename: {
        type: String
    },
    size: {
        type: Number // Size in bytes
    }
}, { _id: false });

/**
 * Sub-schema for audio and video call information.
 */
const CallInfoSchema = new Schema({
    callType: {
        type: String,
        enum: ['audio', 'video'],
        required: true
    },
    status: {
        type: String,
        enum: ['initiated', 'ringing', 'answered', 'missed', 'ended', 'failed'],
        default: 'initiated'
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number // Duration in seconds
    }
}, { _id: false });

/**
 * Main Message Schema
 * This schema is designed to be versatile, handling various types of chat events.
 */
const messageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
        index: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'media', 'call'],
        required: true
    },
    content: {
        text: {
            type: String
        },
        media: [MediaAttachmentSchema],
        call: CallInfoSchema
    },
    deliveryStatus: [DeliveryStatusSchema],
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedFor: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Backend tracking fields for developers
    tracking: {
        sentAt: {
            type: Date,
            default: Date.now
        },
        serverReceivedAt: {
            type: Date
        },
        clientDeliveredAt: {
            type: Date
        },
        latency: { // Time from sent to server received in milliseconds
            type: Number
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

export const Message = mongoose.model('Message', messageSchema);

