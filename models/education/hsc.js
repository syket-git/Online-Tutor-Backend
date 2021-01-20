const mongoose = require('mongoose');
const addSSCLevel = mongoose.Schema({
  hsc_level: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model('HSCLevel', addSSCLevel);
