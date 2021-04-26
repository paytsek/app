const CompanySetting = require('../models/CompanySetting');
const Company = require('../models/Company');
const User = require('../models/User');

class TestUtil {
  static responseSetObject(slug = '') {
    return {
      'x-company-tenant': slug,
    };
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
