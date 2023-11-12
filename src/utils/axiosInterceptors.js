const axios = require('axios');
const axiosApiInstance = axios.create();
const axiosApiInstanceForJson = axios.create();
const myCache = require('../utils/cache');
const handler = require("../services/createOrder")
// Request interceptor for API calls
const customAxios = (contenttype)=>{
  axiosApiInstance.interceptors.request.use(
    async config => {
      const access_token =  myCache.get('accesstoken');
     // console.log(access_token,'ff')
      config.headers = { 
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json',
        'Content-Type': contenttype?contenttype: 'application/x-www-form-urlencoded'
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
    console.log(error,'dd')
    return Promise.reject(error);
  });
  return  axiosApiInstance;
}
// axiosApiInstanceForJson.interceptors.request.use(
//   async config => {
//     const access_token =  myCache.get('accesstoken');
//     console.log(access_token,'ff')
//     config.headers = { 
//       'Authorization': `Bearer ${access_token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     const access_token =  myCache.get('accesstoken');
//     console.log(access_token,'ff')
//     config.headers = { 
//       'Authorization': `Bearer ${access_token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });
// // Response interceptor for API calls
// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const {access_token} = await handler.refreshAccessToken();            
//     axios.default.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });

module.exports = customAxios;