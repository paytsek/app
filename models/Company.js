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
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
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

module.exports = mongoose.model('Company', CompanySchema);
