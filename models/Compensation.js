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
    deminimis: Number,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
  },
);

CompensationSchema.pre('save', async function (next) {
  const employee = await mongoose.model('Employee').findOne({ _id: this.employee });

  if (employee) {
    this.dailyRate = Number(this.basicPay) / Number(employee.workingDays);
    this.hourlyRate = Number(this.dailyRate) / Number(employee.workingHours);
  }

  next();
});

CompensationSchema.post('save', async (doc, next) => {
  const compensations = await mongoose
    .model('Compensation')
    .find({ employee: doc.employee });

  if (compensations.length <= 0) {
    await Employee.findByIdAndUpdate(doc.employee, { compensation: doc });
  } else {
    const [compensation] = compensations.sort((a, b) =>
      (a.basicPay > b.basicPay ? -1 : 1));

    await Employee.findByIdAndUpdate(doc.employee, { compensation });
  }

  next();
});

CompensationSchema.virtual('otherTaxablePays', {
  ref: 'OtherTaxablePay',
  localField: '_id',
  foreignField: 'compensation',
});

module.exports = mongoose.model('Compensation', CompensationSchema);
