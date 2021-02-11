const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const EmployeeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
  },
  fullName: String,
  birthDate: {
    type: Date,
    default: Date.now,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  resignationDate: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  nationality: String,
  civilStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'separated', 'widowed'],
  },
  NumberOfQualifiedDependents: {
    type: Number,
    default: 0,
  },
  rdoCode: String,
  contactNumber: String,
  validId: String,
  validIdNumber: String,
  placeOfIssue: String,
  registeredAddress: {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      required: [true, 'City is required'],
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
    },
  },
  permanentAddress: {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      required: [true, 'City is required'],
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
    },
  },
  formattedRegisteredAddress: String,
  formattedPermanentAddress: String,
  bankingInformation: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  position: {
    type: String,
    require: [true, 'Position is required'],
  },
  workingDays: {
    type: Number,
    default: 22,
  },
  workingHours: {
    type: Number,
    default: 8,
  },
  sssNumber: String,
  phicNumber: String,
  hdmfNumber: String,
  sssLoanBalance: String,
  allowances: String,
  hdmfLoanBalance: String,
  primaryEmployer: {
    type: Boolean,
    default: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company must exist'],
  },
});

EmployeeSchema.plugin(uniqueValidator, {
  message: (val) => {
    const field = val.path;
    const fieldCapitalized = field.charAt(0).toUpperCase() + field.slice(1);
    return `${fieldCapitalized} already exist`;
  },
});

EmployeeSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;

  this.formattedRegisteredAddress = `${this.registeredAddress.street}, ${this.registeredAddress.city}, ${this.registeredAddress.country}, ${this.registeredAddress.zipCode}`;

  this.formattedPermanentAddress = `${this.permanentAddress.street}, ${this.permanentAddress.city}, ${this.permanentAddress.country}, ${this.permanentAddress.zipCode}`;

  next();
});
