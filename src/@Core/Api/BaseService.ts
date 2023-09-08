import createInstance from './Axios';

class BaseService {
   //
   BASE_URL: string = 'http://localhost:5001' + '/api';

   BASE_ENDPOINT: string = '';

   request: any;

   middleware: any;

   constructor() {
      this.setRequest();
   }

   setRequest() {
      this.request = createInstance(this.BASE_URL );
   }

   /**
    * @param {Object} query
    * @returns
    */
   get(query: object | null = null) {
      return this.request.get(this.BASE_ENDPOINT, { query });
   }

   /**
    * @param {string} id
    * @returns
    */
   find(id: string) {
      return this.request.get(this.BASE_ENDPOINT + id);
   }

   /**
    * @param {object} data
    * @returns
    */
   create<T>(data: T) {
      return this.request.post(this.BASE_ENDPOINT, { data });
   }

   /**
    * @param {object} data
    * @returns
    */
   update<T>(data: T, id: number | string) {
      return this.request.put(this.BASE_ENDPOINT + id, data);
   }

   /**
    * @param {string | number} data
    * @returns
    */
   delete(id: string | number) {
      return this.request.delete(this.BASE_ENDPOINT + id);
   }
}

export default BaseService;
