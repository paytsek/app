const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      minlength: [3, 'Username must atleast 3 characters'],
      maxlength: [120, 'Username must not exceed to 120 characters'],
      unique: true,
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
        async validator(val) {
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
    role: {
      type: String,
      default: 'member',
      enum: ['member', 'admin'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.virtual('companies', {
  ref: 'Company',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.set('toJSON', {
  transform: (doc, user) => {
    const currentUser = user;
    delete currentUser.password;
    return currentUser;
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  this.fullName = `${this.firstName} ${this.lastName}`;
});

UserSchema.pre('remove', async function (next) {
  const companies = await this.model('Company')
    .find({ user: this._id });
  companies.forEach(async (company) => {
    await company.remove();
  });
  next();
});

UserSchema.methods.generateJwtToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    role: this.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

UserSchema.methods.isMatch = async function (enteredPassword) {
  const comparedPassword = await bcrypt.compare(enteredPassword, this.password);
  return comparedPassword;
};

UserSchema.plugin(uniqueValidator, {
  message: (val) => {
    const field = val.path;
    const fieldCapitalized = field.charAt(0).toUpperCase() + field.slice(1);
    return `${fieldCapitalized} already exist`;
  },
});

module.exports = mongoose.model('User', UserSchema);
