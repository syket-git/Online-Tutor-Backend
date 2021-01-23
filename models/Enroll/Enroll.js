const mongoose = require('mongoose');

const EnrollSchema = mongoose.Schema({
  tutorId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EnrollSchema', EnrollSchema);
