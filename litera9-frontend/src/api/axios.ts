import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pt-madding-api-production.up.railway.app/api',
});

export const injectInterceptors = (setLoading: (v: boolean) => void) => {
  let reqCount = 0;

  instance.interceptors.request.use(config => {
    reqCount++;
    setLoading(true);
    return config;
  });

  instance.interceptors.response.use(
    res => {
      reqCount--;
      if (reqCount === 0) setLoading(false);
      return res;
    },
    err => {
      reqCount--;
      if (reqCount === 0) setLoading(false);
      return Promise.reject(err);
    }
  );
};

export default instance;