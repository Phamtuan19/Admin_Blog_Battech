import BaseService from '../../@Core/Api/BaseService';

class AuthorService extends BaseService {
   BASE_ENDPOINT = 'author';

   getAll(data?: any) {
      return this.get(data);
   }

   createAuthor(data: { name: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/create', data);
   }

   getOne(id: string) {
      return this.find(id);
   }

   deleteAuthor(id: string) {
      return this.delete(id);
   }

   updateAuthor(id: string, data: any) {
      return this.update(data, id);
   }
}

const authorService = new AuthorService();
export default authorService;
