const mongoose = require('mongoose');
const moment = require('moment');

const Employee = require('./Employee');

const StatusSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
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
    autoCreate: true,
  },
);

StatusSchema.post('save', async (doc, next) => {
  const statuses = await mongoose.model('Status').find({ employee: doc.employee });

  if (statuses.length <= 0) {
    await Employee.findByIdAndUpdate(doc.employee, { status: doc });
  } else {
    const status = statuses.reduce((acc, val) =>
      (moment().valueOf(acc.effectivityDate) > moment().valueOf(val.effectivityDate)
        ? acc
        : val));

    await Employee.findByIdAndUpdate(doc.employee, { status });
  }

  next();
});

module.exports = mongoose.model('Status', StatusSchema);
