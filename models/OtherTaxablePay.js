const mongoose = require('mongoose');

const OtherTaxablePaySchema = new mongoose.Schema(
  {
    value: Number,
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Employee must exist'],
    },
    taxablePay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaxablePay',
      required: [true, 'Taxable pay must exist'],
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

module.exports = mongoose.model('OtherTaxablePay', OtherTaxablePaySchema);
