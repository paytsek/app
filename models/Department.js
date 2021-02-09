const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a department'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company must exist'],
    },
    companySettings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanySetting',
      required: [true, 'Company Setting must exist'],
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  },
);

DepartmentSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

module.exports = mongoose.model('Department', DepartmentSchema);
