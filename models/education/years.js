const mongoose = require('mongoose');
const addYear = mongoose.Schema({
  passing_year: {
    type: Number,
  },
});

module.exports = mongoose.model('years', addYear);
