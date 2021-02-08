const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a department'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Company must exist'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Department', DepartmentSchema);
