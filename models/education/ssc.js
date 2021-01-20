const mongoose = require('mongoose');
const addSSCLevel = mongoose.Schema({
  ssc_level: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model('SSCLevel', addSSCLevel);
