const mongoose = require('mongoose');

const Employee = require('./Employee');

const CompensationSchema = new mongoose.Schema(
  {
    basicPay: {
      type: Number,
      required: [true, 'Basic Pay is required'],
    },
    dailyRate: {
      type: Number,
    },
    hourlyRate: {
      type: Number,
    },
    effectivityDate: {
      type: Date,
      default: Date.now,
      required: [true, 'Effectivity Date is required'],
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
    taxablePays: {
      others: mongoose.Schema.Types.Mixed,
    },
    nonTaxablePays: {
      deminimis: {
        type: Number,
      },
      others: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
  },
);

CompensationSchema.post('save', async (doc, next) => {
  const compensations = await mongoose
    .model('Compensation')
    .find({ employee: doc.employee });

  if (compensations.length <= 0) {
    await Employee.findByIdAndUpdate(doc.employee, { compensation: doc });
  } else {
    const compensation = compensations.reduce((acc, val) =>
      (acc.basicPay > val.basicPay ? acc : val));

    await Employee.findByIdAndUpdate(doc.employee, { compensation });
  }

  next();
});

module.exports = mongoose.model('Compensation', CompensationSchema);
