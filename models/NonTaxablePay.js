const mongoose = require('mongoose');

const NonTaxablePaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a non taxable'],
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

NonTaxablePaySchema.pre('remove', async function (next) {
  await mongoose.model('OtherNonTaxablePay').deleteMany({ nonTaxablePay: this._id });

  next();
});

module.exports = mongoose.model('NonTaxablePay', NonTaxablePaySchema);
