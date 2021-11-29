import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

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

$authHost.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError) => {
    const status = err.response?.status || 500;
    switch (status) {
      case 400: {
        return Promise.reject(new Error(err.response?.data.message));
      }
      case 500: {
        return Promise.reject(new Error(err.response?.data.message));
      }
      default: {
        return Promise.reject(new Error("test error 500"));
      }
    }
  }
);

export { $host, $authHost };
