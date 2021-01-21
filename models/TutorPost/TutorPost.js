const mongoose = require('mongoose');

const TutorPostSchema = mongoose.Schema({
  tutorId: {
    type: String,
    required: true,
  },
  tutorName: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TutorPostSchema', TutorPostSchema);
