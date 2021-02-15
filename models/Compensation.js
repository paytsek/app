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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CompensationSchema.post('save', async (doc, next) => {
  const compensations = await mongoose.model('Compensation').find({ employee: doc.employee });

  const compensation = compensations.reduce((acc, val) => acc.basicPay > val.basicPay);

  await Employee.findByIdAndUpdate(doc.employee, { compensation });

  next();
});

module.exports = mongoose.model('Compensation', CompensationSchema);
