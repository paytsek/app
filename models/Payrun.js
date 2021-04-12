const mongoose = require('mongoose');

const PAYRUN_STATUS = ['draft', 'approved', 'void', 'denied'];

const PAYRUN_TAX_PAYMENT = ['full', 'half', 'none'];

const PayrunSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Start Date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End Date is required'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: PAYRUN_STATUS,
    default: 'draft',
  },
  payoutDate: {
    type: Date,
    required: [true, 'Payout Date is required'],
  },
  totalNetPay: {
    type: Number,
    defualt: 0,
  },
  special: {
    type: Boolean,
    default: false,
  },
  displayBeforePayout: {
    type: Boolean,
    default: false,
  },
  taxPayment: {
    type: String,
    enum: PAYRUN_TAX_PAYMENT,
    default: 'full',
  },
});

module.exports = mongoose.model('Payrun', PayrunSchema);
