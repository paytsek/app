const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'Company name is required'],
	},
	slug: String,
	companySetting: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CompanySetting',
	},
});

module.exports = mongoose.model('Company', CompanySchema);
