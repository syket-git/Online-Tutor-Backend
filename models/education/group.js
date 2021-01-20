const mongoose = require('mongoose');
const addGroupName = mongoose.Schema({
  group_name: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model('Groups', addGroupName);
