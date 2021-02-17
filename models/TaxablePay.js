const mongoose = require('mongoose');

const TaxablePaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a taxable'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company must exist'],
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  },
);

module.exports = mongoose.model('TaxablePay', TaxablePaySchema);
