const mongoose = require('mongoose');
const addBoardName = mongoose.Schema({
  board_name: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model('Boards', addBoardName);
