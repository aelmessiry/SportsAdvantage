import axios from "axios";
//check if url is local or production
// const isLocalhost = false;
const isLocalhost = false
const axiosToken = axios.create({
  baseURL: isLocalhost
    ? import.meta.env.VITE_SOCIAL_WALLET_API_LOCAL
    : import.meta.env.VITE_SOCIAL_WALLET_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the authorization header

export function setAxiosToken(token) {
  axiosToken.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["x-api-key"] =
          import.meta.env.VITE_SPORTS_ADVANTAGE_API_KEY;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default axiosToken;
