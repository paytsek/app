const CompanySetting = require('../models/CompanySetting');
const Company = require('../models/Company');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Compensation = require('../models/Compensation');

class TestUtil {
  static responseSetObject(slug = '') {
    return {
      'x-company-tenant': slug,
    };
  }

  static createCompensation(compensation) {
    return Compensation.create(compensation);
  }

  static createEmployee(employee) {
    return Employee.create(employee);
  }

  static createCompanySetting(companySetting) {
    return CompanySetting.create(companySetting);
  }

  static companySettingCountDocuments() {
    return CompanySetting.countDocuments();
  }

  static createCompany(company) {
    return Company.create(company);
  }

  static createUser(user) {
    return User.create(user);
  }
}

module.exports = TestUtil;
