const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    default: 'Online'
  },
  url: {
    type: String,
    default: ''
  },
  skillsCovered: {
    type: [String],
    default: []
  },
  duration: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
