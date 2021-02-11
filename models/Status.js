const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  effectivityDate: {
    type: Date,
    default: Date.now,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee must exist'],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company must exist'],
  },
});

module.exports = mongoose.model('Status', StatusSchema);
