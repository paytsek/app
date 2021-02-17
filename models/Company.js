const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');

const CompanySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must exist'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Company name is required'],
    },
    slug: {
      type: String,
      unique: true,
    },
    administrators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Administrator must exist'],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CompanySchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

CompanySchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

CompanySchema.pre('remove', async function (next) {
  await this.model('CompanySetting').deleteOne({ company: this._id });

  next();
});

// Reverse populate to company settings
CompanySchema.virtual('companySettings', {
  ref: 'CompanySetting',
  localField: '_id',
  foreignField: 'company',
  justOne: true,
});

// REVERSE POPULATE DEPARTMENT
CompanySchema.virtual('departments', {
  ref: 'Department',
  localField: '_id',
  foreignField: 'company',
});

// REVERSE POPULATE EMPLOYEES
CompanySchema.virtual('employees', {
  ref: 'Empoyee',
  localField: '_id',
  foreignField: 'company',
});

// REVERSE POPULATE TAXABELPAYS
CompanySchema.virtual('taxablePays', {
  ref: 'TaxablePay',
  localField: '_id',
  foreignField: 'company',
});

module.exports = mongoose.model('Company', CompanySchema);
