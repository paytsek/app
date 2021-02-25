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

TaxablePaySchema.pre('remove', async function (next) {
  await mongoose.model('OtherTaxablePay').deleteMany({ taxablePay: this._id });

  next();
});

module.exports = mongoose.model('TaxablePay', TaxablePaySchema);
