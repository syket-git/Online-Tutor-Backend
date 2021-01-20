const mongoose = require('mongoose');
const studentUpdateProfile = mongoose.Schema({
  userId: {
    type: String,
  },
  email: {
    type: String,
  },
  className: {
    type: String,
  },
  presentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('studentUpdateProfile', studentUpdateProfile);
