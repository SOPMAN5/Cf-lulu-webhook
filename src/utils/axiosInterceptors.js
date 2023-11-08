const axios = require('axios');
const axiosApiInstance = axios.create();
const myCache = require('../utils/cache');
const handler = require("../services/createOrder")
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const access_token =  myCache.get('accesstoken');
    console.log(access_token,'ff')
    config.headers = { 
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const {access_token} = await handler.refreshAccessToken();            
    axios.default.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

module.exports = axiosApiInstance;