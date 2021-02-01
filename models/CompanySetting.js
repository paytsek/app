const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ACCOUNTING_JOURNAL = [
  'wagesAndSalaries',
  'wagesPayable',
  'sssPayable',
  'hdmfPayable',
  'phicPayable',
  'thirteenthMonthPay',
  'employeeBenefits',
  'advancesToEmployees',
  'withholdingTaxOnCompensationPayable',
];

const CompanySettingSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Must have a company'],
      unique: true,
    },
    tin: {
      type: String,
      trim: true,
    },
    rdoCode: {
      type: String,
      trim: true,
    },
    registeredAddress: {
      street: {
        type: String,
        trim: true,
        required: [true, 'Street is required'],
      },
      city: {
        type: String,
        trim: true,
        required: [true, 'City is required'],
      },
      country: {
        type: String,
        trim: true,
        required: [true, 'Country is required'],
      },
      zipCode: {
        type: String,
        trim: true,
        required: [true, 'Zip code is required'],
      },
    },
    formattedAddress: String,
    zipCode: String,
    telephoneNumber: String,
    category: {
      type: String,
      enum: ['private', 'government'],
      default: 'private',
      required: [true, 'Category is Required'],
    },
    frequency: {
      type: String,
      enum: ['semiMonthly', 'monthly'],
      default: 'monthly',
      required: [true, 'Payroll frequency is required'],
    },
    reportingBase: {
      type: String,
      default: 'payrollCutOffs',
      enum: ['payrollCutOffs', 'payoutDates'],
      required: [true, 'Reporting base is required'],
    },
    firstCutOff: {
      type: Number,
      required: [
        function () {
          return this.frequency === 'semiMonthly' || this.frequency === 'monthly';
        },
        'First Cut Off is required',
      ],
    },
    secondCutOff: {
      type: Number,
      required: [
        function () {
          return this.frequency === 'semiMonthly';
        },
        'Second Cut Off is required',
      ],
    },
    firstPayout: {
      type: Number,
      required: [
        function () {
          return this.frequency === 'semiMonthly' || this.frequency === 'monthly';
        },
        'First Payout is required',
      ],
    },
    secondPayout: {
      type: Number,
      required: [
        function () {
          return this.frequency === 'semiMonthly';
        },
        'Second Payout is required',
      ],
    },
    workingDays: {
      type: Number,
      default: 22,
      required: [true, 'Working days is required'],
    },
    nightDifferential: {
      type: String,
      enum: ['disabled', 'percentage', 'fixed'],
      default: 'disabled',
      required: [true, 'Nigth differential is required'],
    },
    nightDifferentialPercentage: {
      type: Number,
      default: 0.1,
      required: [
        function () {
          return this.nightDifferential === 'percentage';
        },
        'Night Differential Percentage is required',
      ],
      validate(val) {
        if (this.nightDifferential === 'percentage' && val <= 0) {
          throw new Error("Can't be blank or negative");
        }
      },
    },
    overtime: {
      type: String,
      default: 'disabled',
      enum: ['disabled', 'hourly', 'fixed'],
      required: [true, 'Overtime is required'],
    },
    overtimePay: {
      type: Number,
      default: 1.25,
      required: [
        function () {
          return this.overtime === 'hourly';
        },
        'Overtime Pay is required',
      ],
      validate(val) {
        if (this.overtime === 'hourly' && val <= 0) {
          throw new Error("Can't be blank or negative");
        }
      },
    },
    overtimeRestDayPay: {
      type: Number,
      default: 1.3,
      required: [
        function () {
          return this.overtime === 'hourly';
        },
        'Overtime Rest Day Pay is required',
      ],
      validate(val) {
        if (this.overtime === 'hourly' && val <= 0) {
          throw new Error("Can't be blank or negative");
        }
      },
    },
    holiday: {
      type: Boolean,
      default: false,
      required: [true, 'Holiday is required'],
    },
    regularHolidayPay: {
      type: Number,
      default: 1,
      required: [
        function () {
          return this.holiday;
        },
        'Regular Holiday Pay is required',
      ],
      validate(val) {
        if (this.holiday && val <= 0) {
          throw new Error("Can't be blank or negative");
        }
      },
    },
    specialHolidayPay: {
      type: Number,
      default: 0.3,
      required: [
        function () {
          return this.holiday;
        },
        'Special Holiday Pay is required',
      ],
      validate(val) {
        if (this.holiday && val <= 0) {
          throw new Error("Can't be blank or negative");
        }
      },
    },
    taxReliefInternationTaxTreaty: {
      type: Boolean,
      default: false,
      required: [true, 'Tax treaty is required'],
    },
    deminimis: {
      type: Boolean,
      default: false,
      required: [true, 'De minimis is required'],
    },
    emailNotification: {
      type: Boolean,
      default: false,
    },
    hideEmployeeList: {
      type: Boolean,
      default: false,
    },
    atc: String,
    sssRegistrationNumber: String,
    phicNumber: String,
    hdmfNumber: String,
    taxablePays: {
      type: [String],
      default: [],
    },
    nonTaxablePays: {
      type: [String],
      default: [],
    },
    sssCalculation: {
      type: Object,
      default: {
        deminimis: false,
        taxablePays: {
          type: Object,
          default: {},
        },
        nonTaxablePays: {
          type: Object,
          default: {},
        },
      },
    },
    phicCalculation: {
      type: Object,
      default: {
        deminimis: false,
        taxablePays: {
          type: Object,
          default: {},
        },
        nonTaxablePays: {
          type: Object,
          default: {},
        },
      },
    },
    thirteenthMonthPayCalculation: {
      type: Object,
      default: {
        deminimis: false,
        absences: false,
        taxablePays: {
          type: Object,
          default: {},
        },
        nonTaxablePays: {
          type: Object,
          default: {},
        },
      },
    },
    departments: {
      type: [String],
      required: [true, 'Please add department'],
      validate(val) {
        if (val.length <= 0) {
          throw new Error('Please add department');
        }
      },
    },
    accountingJournal: {
      deminimisBenefits: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      employeeBenefits: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      hdmfPayable: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      netPay: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      nonTaxableCompensation: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      phicPayable: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      postTaxDeduction: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      preTaxDeduction: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      reimbursement: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      sssPayable: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      taxDue: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      taxableCompensation: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
      thirteenthMonthPay: {
        type: String,
        default: 'wagesAndSalaries',
        enum: ACCOUNTING_JOURNAL,
      },
    },
  },
  {
    timestamps: true,
  },
);

CompanySettingSchema.plugin(uniqueValidator, {
  message: val => {
    const field = val.path;
    const fieldCapitalized = field.charAt(0).toUpperCase() + field.slice(1);
    return `${fieldCapitalized} already exist`;
  },
});

CompanySettingSchema.pre('save', function (next) {
  const street = (this.registeredAddress.street && `${this.registeredAddress.street}, `) || '';
  const city = (this.registeredAddress.city && `${this.registeredAddress.city}, `) || '';
  const country = (this.registeredAddress.country && `${this.registeredAddress.country}`) || '';
  const zipCode = this.registeredAddress.zipCode && this.registeredAddress.zipCode;

  const formattedAddress = `${street}${city}${country}`;

  this.formattedAddress = formattedAddress;
  this.zipCode = zipCode;

  next();
});

module.exports = mongoose.model('CompanySetting', CompanySettingSchema);
