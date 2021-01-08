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
		validate: {
			validator: async function (val) {
				const username = await this.model('User').findOne({ username: val });
				return !username;
			},
			message: (props) => `${props.value} is already exist`,
		},
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		trim: true,
	},
	fullName: String,
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
	this.fullName = `${this.firstname} ${this.lastName}`;
});

UserSchema.methods.generateJwtToken = function () {
	const payload = {
		_id: this._id,
		email: this.email,
		username: this.username,
	};

	return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

UserSchema.methods.isMatch = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
