class Services {
  static responseSetObject(slug = '') {
    return {
      'x-company-tenant': slug,
    };
  }
}

module.exports = Services;
