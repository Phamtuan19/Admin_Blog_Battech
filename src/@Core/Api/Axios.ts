import axios from 'axios';

const createInstance = (baseURL: string) => {
   const options: any = {
      baseURL,
      withCredentials: true,
      headers: {
         'X-Requested-With': 'XMLHttpRequest',
      },
   };

   const axiosInstance = axios.create(options);

   axiosInstance.interceptors.request.use(
      async (requestConfig) => {
         // middlewareBaseAxios(requestConfig);
         return requestConfig;
      },
      async (error) => {
         return Promise.reject(error);
      },
   );

   // Thêm một bộ đón chặn response khi resquest trả về
   axiosInstance.interceptors.response.use(
      // success
      (response) => {
         if (response && response.data) {
            return response.data;
         }
         return response;
      },
      (error) => {
         // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
         // Làm gì đó với lỗi response
         return Promise.reject(error);
      },
   );

   return axiosInstance;
};

export default createInstance;
