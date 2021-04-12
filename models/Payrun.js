const mongoose = require('mongoose');

const PayrunSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Start Date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End Date is required'],
  },
});

module.exports = mongoose.model('Payrun', PayrunSchema);
