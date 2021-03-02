const mongoose = require('mongoose');

const Employee = require('./Employee');

const StatusSchema = new mongoose.Schema(
  {
    employmentStatus: {
      type: String,
      enum: [
        'active',
        'inactive',
        'indefinite',
        'maternityLeave',
        'paternityLeave',
        'medicalLeave',
        'sabbatical',
        'soloParentLeave',
      ],
      default: 'active',
    },
    effectivityDate: {
      type: Date,
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
    const [status] = statuses.sort((a, b) =>
      (a.effectivityDate > b.effectivityDate ? -1 : 1));

    await Employee.findByIdAndUpdate(doc.employee, { status });
  }

  next();
});

module.exports = mongoose.model('Status', StatusSchema);
