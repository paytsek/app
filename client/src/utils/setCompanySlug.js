import axios from '../axios';

const setCompanySlug = (slug) => {
  if (slug) {
    axios.defaults.headers.common['x-company-slug'] = slug;
  } else {
    delete axios.defaults.headers.common['x-company-slug'];
  }
};

export default setCompanySlug;
