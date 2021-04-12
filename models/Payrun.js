const mongoose = require('mongoose');

const PayrunSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Start Date is required'],
  },
});

module.exports = mongoose.model('Payrun', PayrunSchema);
