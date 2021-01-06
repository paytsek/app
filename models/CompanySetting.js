const mongoose = require('mongoose');

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

const CompanySettingSchema = new mongoose.Schema({
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
		default: 'semiMonthly',
		required: [true, 'Payroll frequency is required'],
	},
	reportingBase: {
		type: String,
		default: 'payrollCutOffs',
		enum: ['payrollCutOffs', 'payoutDates'],
		required: [true, 'Reporting base is required'],
	},
	firstCutOff: Number,
	SecondCutOff: Number,
	firstPayout: Number,
	secondPayout: Number,
	cutOffs: {
		type: Object,
		default: {},
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
	nightDifferentialPercentage: Number,
	overtime: {
		type: String,
		default: 'disabled',
		enum: ['disabled', 'hourly', 'fixed'],
	},
	overtimePay: Number,
	overtimeRestDayPay: Number,
	holiday: {
		type: Boolean,
		default: false,
	},
	regularHolidayPay: Number,
	specialHolidayPay: Number,
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
	atcCodes: String,
	sssRegistrationNumber: String,
	phicNumber: String,
	hdmfNumber: String,
	payItemsWithCorrespondingAccountExpense: String,
	companyTaxablePays: {
		type: [String],
		default: [],
	},
	companyNonTaxablePays: {
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
});

module.exports = mongoose.model('CompanySetting', CompanySettingSchema);
