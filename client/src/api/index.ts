import axios, { AxiosRequestConfig } from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getLocalStore = () => {
  const json = localStorage.getItem("token");
  if (!json) {
    return "";
  }
  return json;
};

const authInterceptor = (config: AxiosRequestConfig) => {
  const token = getLocalStore();

  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
};

// const authInterceptor = (config: AxiosRequestConfig) => {
//   (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem(
//     "token"
//   )}`;
//   return config;
// };

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
