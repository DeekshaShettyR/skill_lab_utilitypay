// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
