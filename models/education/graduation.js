const mongoose = require('mongoose');
const GraduationSchema = mongoose.Schema({
  graduation_degree: {
    type: String,
  },
});

module.exports = mongoose.model('graduation', GraduationSchema);
