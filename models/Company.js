const mongoose = require('mongoose');
const slugify = require('slugify');

const CompanySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			trim: true,
			required: [true, 'Company name is required'],
			validate: {
				validator: async function (val) {
					const name = await this.model('Company').findOne({ name: val });
					return !name;
				},
				message: (props) => `${props.value} is already exist`,
			},
		},
		slug: String,
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

CompanySchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
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
