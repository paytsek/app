const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: [true, 'Username is required'],
		minlength: [3, 'Username must atleast 3 characters'],
		maxlength: [120, 'Username must not exceed to 120 characters'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Email is required'],
		unique: true,
		validate: {
			validator: async function (val) {
				const user = await this.model('User').findOne({ email: val });

				if (user) {
					throw new Error('Email already exist');
				}

				if (!validator.isEmail(val)) {
					throw new Error('Email is invalid');
				}
			},
		},
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must atleast 6 characters'],
		select: false,
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);

	this.password = hash;
});

UserSchema.methods.generateJwtToken = function () {
	const payload = {
		id: this._id,
		email: this.email,
		username: this.username,
	};

	return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

module.exports = mongoose.model('User', UserSchema);
