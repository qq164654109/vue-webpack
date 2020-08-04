/**
 *  环境变量
 */

const API_URL = process.env.VUE_APP_API_URL;
const API_REAL_URL = process.env.VUE_APP_PROXY_URL ? process.env.VUE_APP_PROXY_URL : process.env.VUE_APP_API_URL;

export {
  API_URL,
  API_REAL_URL
}
