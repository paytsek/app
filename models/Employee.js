const mongoose = require('mongoose');
const validator = require('validator');

const EmployeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      async validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error('Email is invalid');
        }
        const employee = await mongoose
          .model('Employee')
          .findOne({ company: this.company, email: val });
        if (employee) {
          throw new Error('Email already exist');
        }
      },
    },
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
    },
    employeeNumber: {
      type: String,
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
    numberOfQualifiedDependents: {
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
    tin: String,
    sssNumber: String,
    phicNumber: String,
    hdmfNumber: String,
    sssLoanBalance: Number,
    allowances: Number,
    hdmfLoanBalance: Number,
    primaryEmployer: {
      type: Boolean,
      default: true,
    },
    compensation: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company must exist'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

EmployeeSchema.pre('save', function (next) {
  if (!this.employeeNumber) {
    this.employeeNumber = this._id;
  }
  this.fullName = `${this.firstName} ${this.lastName}`;

  this.formattedRegisteredAddress = `${this.registeredAddress.street}, ${this.registeredAddress.city}, ${this.registeredAddress.country}, ${this.registeredAddress.zipCode}`;

  this.formattedPermanentAddress = `${this.permanentAddress.street}, ${this.permanentAddress.city}, ${this.permanentAddress.country}, ${this.permanentAddress.zipCode}`;

  next();
});

EmployeeSchema.post('save', function (doc, next) {
  if (!doc.employeeNumber) {
    this.employeeNumber = doc._id;
  }

  next();
});

EmployeeSchema.pre('remove', async function (next) {
  await mongoose.model('Status').deleteMany({ employee: this._id });
  await mongoose.model('Compensation').deleteMany({ employee: this._id });

  next();
});

EmployeeSchema.virtual('compensations', {
  ref: 'Compensation',
  localField: '_id',
  foreignField: 'employee',
  justOne: false,
});

EmployeeSchema.virtual('statuses', {
  ref: 'Status',
  localField: '_id',
  foreignField: 'employee',
  justOne: false,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
