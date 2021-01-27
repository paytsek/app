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
      },
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
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
    },
    holiday: {
      type: Boolean,
      default: false,
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
    },
    taxReliefInternationTaxTreaty: {
      type: Boolean,
      default: false,
    },
    deminimis: {
      type: Boolean,
      default: false,
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
    thirtheenthMonthPayCalculation: {
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
      thirtheenthMonthPay: {
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
