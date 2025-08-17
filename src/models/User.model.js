import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const preferencesSchema = new Schema({
    budget:{
        type: Number,
        required: true
    },
    genderPreference: {
        type: String,
        enum: ['male', 'female', 'other'] 
    },
    ageRange: {
        type: [Number],
        validate: {
            validator: function(v) {
                return v.length === 2 && v[0] < v[1];
            } 
        },
        required: true
    },
    state:{
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
    area: {
        type: String,
        required: true
    },
    smokingPreference: {
        type: String,
        enum: ['smoker', 'non-smoker', 'any'],
        default: 'any'
    },
    drinkingPreference: {
        type: String,
        enum: ['drinker', 'non-drinker', 'any'],
        default: 'any'
    },
    petsPreference: {
        type: String,
        enum: ['pet-friendly', 'no-pets', 'any'],
        default: 'any'
    },
   
    cleanliness: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    
    wakeupTime:{
        type: String,
        required: false
    },
    sleepTime: {
        type: String,
        required: false
    },
    cookingPreference: {
        type: String,
        enum: ['cook', 'no-cook', 'any'],
        default: 'any'
    }
}, { _id: false });

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    mobile: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Validates a 10-digit number
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'] 
    },
    university:{
        type: String,
        required: false
    },
    organization: {
        type: String,
        required: false
    },
    preferences: preferencesSchema,
    bio: {
        type: String,
        maxlength: 500,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    matches: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });


userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
