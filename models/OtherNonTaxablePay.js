const mongoose = require('mongoose');

const OtherNonTaxablePaySchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      default: 0,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Employee must exist'],
    },
    nonTaxablePay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NonTaxablePay',
      required: [true, 'Non Taxable pay must exist'],
    },
    compensation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Compensation',
      required: [true, 'Compensation must exist'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
  },
);

module.exports = mongoose.model('OtherNonTaxablePay', OtherNonTaxablePaySchema);
