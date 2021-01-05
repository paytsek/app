const mongoose = require('mongoose');

const CompanySettingSchema = new mongoose.Schema({
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
	slug: {
		type: String,
		unique: true,
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
});

module.exports = mongoose.model('CompanySetting', CompanySettingSchema);
