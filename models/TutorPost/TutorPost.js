const mongoose = require('mongoose');

const TutorPostSchema = mongoose.Schema({
  tutorId: {
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
  payment: {
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
  enrolled: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TutorPostSchema', TutorPostSchema);
