const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('colors');

dotenv.config({ path: './config/config.env' });

const User = require('./models/User');
const Company = require('./models/Company');
const CompanySetting = require('./models/CompanySetting');
const Department = require('./models/Department');
const Employee = require('./models/Employee');
const Compensation = require('./models/Compensation');

const db = process.env.MONGO_URI_DEV;

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const companies = JSON.parse(fs.readFileSync(`${__dirname}/_data/companies.json`, 'utf-8'));
const companySettings = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/companySettings.json`, 'utf-8'),
);
const departments = JSON.parse(fs.readFileSync(`${__dirname}/_data/departments.json`, 'utf-8'));
const employees = JSON.parse(fs.readFileSync(`${__dirname}/_data/employees.json`, 'utf-8'));
const compensations = JSON.parse(fs.readFileSync(`${__dirname}/_data/compensations.json`, 'utf-8'));

const importData = async () => {
  try {
    await User.create(users);
    await Company.create(companies);
    await CompanySetting.create(companySettings);
    await Department.create(departments);
    await Employee.create(employees);
    await Compensation.create(compensations);

    console.log('Data imported...'.green.inverse);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany({});
    await Company.deleteMany({});
    await CompanySetting.deleteMany({});
    await Department.deleteMany({});
    await Employee.deleteMany({});
    await Compensation.deleteMany({});

    console.log('Data deleted...'.red.inverse);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
