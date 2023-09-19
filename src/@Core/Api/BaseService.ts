import { AxiosInstance } from 'axios';

import createInstance from './Axios';

class BaseService {
   //https://be-admin-blog-battech.vercel.app/api
   BASE_URL: string = 'https://be-admin-blog-battech.vercel.app/api';
   // BASE_URL: string = 'http://localhost:5001/api';

   // BASE_URL: string = import.meta.env.BASE_URL;

   BASE_ENDPOINT: string = '';

   request: AxiosInstance;

   middleware: any;

   constructor() {
      this.request = createInstance(this.BASE_URL);
   }

   /**
    * @param {Object} query
    * @returns
    */
   get(params: object | null = null) {
      return this.request.get(this.BASE_ENDPOINT, { params });
   }

   /**
    * @param {string} id
    * @returns
    */
   find(id: string) {
      return this.request.get(this.BASE_ENDPOINT + '/' + id);
   }

   /**
    * @param {object} data
    * @returns
    */
   create<T>(data: T) {
      return this.request.post(this.BASE_ENDPOINT + '/create', { body: data });
   }

   /**
    * @param {object} data
    * @returns
    */
   update<T>(data: T, id: number | string) {
      return this.request.put(this.BASE_ENDPOINT + '/' + id, data);
   }

   /**
    * @param {string | number} data
    * @returns
    */
   delete(id: string | number) {
      return this.request.delete(this.BASE_ENDPOINT + '/' + id);
   }
}

export default BaseService;
