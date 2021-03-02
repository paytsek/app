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
  const employees = await mongoose.model('Employee').find({ company: this._id });
  employees.forEach(async (employee) => {
    await mongoose.model('OtherTaxablePay').deleteMany({ employee: employee._id });
    await mongoose.model('OtherNonTaxablePay').deleteMany({ employee: employee._id });
  });

  await this.model('CompanySetting').deleteMany({ company: this._id });
  await mongoose.model('Compensation').deleteMany({ company: this._id });
  await mongoose.model('Department').deleteMany({ company: this._id });
  await mongoose.model('Employee').deleteMany({ company: this._id });
  await mongoose.model('NonTaxablePay').deleteMany({ company: this._id });
  await mongoose.model('TaxablePay').deleteMany({ company: this._id });
  await mongoose.model('Status').deleteMany({ company: this._id });

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

// REVERSE POPULATE TAXABLE PAYS
CompanySchema.virtual('taxablePays', {
  ref: 'TaxablePay',
  localField: '_id',
  foreignField: 'company',
});

// REVERSE POPULATE NON TAXABLE PAYS
CompanySchema.virtual('nonTaxablePays', {
  ref: 'NonTaxablePay',
  localField: '_id',
  foreignField: 'company',
});

module.exports = mongoose.model('Company', CompanySchema);
