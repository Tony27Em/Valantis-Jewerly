import axios from 'axios';
import { md5 } from 'js-md5';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_PASS = import.meta.env.VITE_REACT_APP_API_PASS;
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use(config => {
  config.headers['X-Auth'] = md5(API_PASS + '_' + timestamp);
  config.headers['Content-Type'] = 'application/json';
  return config;
})

$api.interceptors.response.use(
  config => config,
  async (error) => {
    const { config, response } = error;

    if (response && response.status === 500 && !config._isRetry) {
      config._isRetry = true;
      console.log('Идентификатор ошибки:', response.data);      
      return $api(config);        
    }

    return Promise.reject(error);
  }
);

export default $api;