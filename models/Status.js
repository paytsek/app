const mongoose = require('mongoose');
const moment = require('moment');

const Employee = require('./Employee');

const StatusSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
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
});

StatusSchema.post('save', async (doc, next) => {
  const statuses = await mongoose.model('Status').find({ employee: doc.employee });

  const status = statuses.reduce(
    (acc, val) => moment().valueOf(acc.effectivityDate) > moment().valueOf(val.effectivityDate),
  );

  await Employee.findByIdAndUpdate(doc.employee, { status });

  next();
});

module.exports = mongoose.model('Status', StatusSchema);
