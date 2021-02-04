import axios from '../axios';

const setTenant = (tenant) => {
  if (tenant) {
    axios.defaults.headers.common['x-company-tenant'] = tenant;
  } else {
    delete axios.defaults.headers.common['x-company-tenant'];
  }
};

export default setTenant;
