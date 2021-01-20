const mongoose = require('mongoose');
const addUniversity = mongoose.Schema({
  university_name: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model('universities', addUniversity);
