import axios from "axios";

//apply base url for axios
const REACT_APP_APP_URL = "https://jsonplaceholder.typicode.com"; // process.env.REACT_APP_APP_URL;

const axiosApi = axios.create({
  baseURL: REACT_APP_APP_URL,
});

axios.interceptors.request.use(function (config) {
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url: string, config: unknown) {
  return await axiosApi
    .get(url, {
      ...(config as any),
    })
    .then((response) => response.data);
}
