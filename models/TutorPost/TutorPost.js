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
  image: {
    type: String,
    require: true,
  },
  qualification: {
    type: String,
    require: true,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TutorPostSchema', TutorPostSchema);
