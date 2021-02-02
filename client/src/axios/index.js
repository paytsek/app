import axios from 'axios';

const baseURL =
  (process.env.NODE_ENV === 'development' && 'http://localhost:5000/api/v1') ||
  (process.env.NODE_ENV === 'production' && 'https://staging-paytsek.herokuapp.com/api/v1');

export default axios.create({
  baseURL,
});
