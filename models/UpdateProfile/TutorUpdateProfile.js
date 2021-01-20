const mongoose = require('mongoose');
const tutorUpdateProfile = mongoose.Schema({
  userId: {
    type: String,
  },
  email: {
    type: String,
  },
  ssc: {
    examination: {
      type: String,
    },
    board: {
      type: String,
    },
    group: {
      type: String,
    },
    passingYear: {
      type: String,
    },
    result: {
      type: String,
    },
  },
  hsc: {
    examination: {
      type: String,
    },
    board: {
      type: String,
    },
    group: {
      type: String,
    },
    passingYear: {
      type: String,
    },
    result: {
      type: String,
    },
  },
  graduation: {
    degree: {
      type: String,
    },
    subject: {
      type: String,
    },
    board: {
      type: String,
    },
    passingYear: {
      type: String,
    },
    result: {
      type: String,
    },
  },
  master: {
    degree: {
      type: String,
    },
    subject: {
      type: String,
    },
    board: {
      type: String,
    },
    passingYear: {
      type: String,
    },
    result: {
      type: String,
    },
  },

  speciality: {
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

module.exports = mongoose.model('tutorUpdateProfile', tutorUpdateProfile);
