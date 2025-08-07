import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    roomName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        enum: ['Paying Guest House', 'Flat', 'Hostel', 'Apartment'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    availableFrom: {
        type: Date,
        required: true
    },
    photos: [{
        type: String, // Assuming these are URLs to images stored on Cloudinary
        required: false
    }],
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true

    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    amenities: {
        type: [String], // Array of strings for amenities like WiFi, AC, etc.
        required: false
    },
    prefrences: Object

}, {
    timestamps: true

});

export const Room = mongoose.model("Room", roomSchema);