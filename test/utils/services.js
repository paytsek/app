const User = require('../../models/User');

class Services {
  static responseSetObject(slug = '') {
    return {
      'x-company-tenant': slug,
    };
  }

  static async createUser(user) {
    await User.create(user);
  }
}

module.exports = Services;
