const mongoose = require('mongoose');

const TutorRegisterSchema = mongoose.Schema({
  status: {
    type: String,
    default: 'tutor',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    userId: {
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
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TutorRegister', TutorRegisterSchema);
