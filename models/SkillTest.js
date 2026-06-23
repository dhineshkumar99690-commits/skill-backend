const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true }
});

const skillTestSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  questions: [questionSchema],
  duration: {
    type: Number, // in minutes
    default: 10
  }
}, { timestamps: true });

module.exports = mongoose.model('SkillTest', skillTestSchema);
