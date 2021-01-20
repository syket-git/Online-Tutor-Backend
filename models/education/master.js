const mongoose = require('mongoose');
const MasterSchema = mongoose.Schema({
  master_degree: {
    type: String,
  },
});

module.exports = mongoose.model('master', MasterSchema);
