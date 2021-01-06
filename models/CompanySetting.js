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
		required: [true, 'Category is Required'],
	},
	frequency: {
		type: String,
		enum: ['semiMonthly', 'monthly'],
		required: [true, 'Payroll frequency is required'],
	},
	reportingBase: {
		type: String,
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
	workingDays: Number,
	nightDifferential: {
		type: String,
		enum: ['disabled', 'percentage', 'fixed'],
		required: [true, 'Nigth differential is required'],
	},
	nightDifferentialPercentage: Number,
	overtime: {
		type: String,
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
			deminimis: {
				type: Boolean,
				default: false,
			},
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
			deminimis: {
				type: Boolean,
				default: false,
			},
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
			deminimis: {
				type: Boolean,
				default: false,
			},
			absences: {
				type: Boolean,
				default: false,
			},
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
		type: Object,
		deminimisBenefits: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		employeeBenefits: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		hdmfPayable: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		netPay: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		nonTaxableCompensation: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		phicPayable: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		postTaxDeduction: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		preTaxDeduction: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		reimbursement: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		sssPayable: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		taxDue: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		taxableCompensation: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
		thirtheenthMonthPay: {
			type: String,
			enum: ACCOUNTING_JOURNAL,
		},
	},
});

module.exports = mongoose.model('CompanySetting', CompanySettingSchema);
