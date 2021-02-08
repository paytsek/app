const mongoose = require('mongoose');

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
  },
);

module.exports = mongoose.model('Department', DepartmentSchema);
