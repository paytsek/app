const mongoose = require('mongoose');
const validator = require('validator');

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
				if (!validator.isEmail(val)) {
					throw Error('Email is invalid');
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

module.exports = mongoose.model('User', UserSchema);
