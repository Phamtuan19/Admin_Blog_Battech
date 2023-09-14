import BaseService from '../../@Core/Api/BaseService';

class TagService extends BaseService {
   BASE_ENDPOINT = 'tags';

   getAll(query?: any) {
      return this.get(query);
   }

   createTag(data: { name: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/create', data);
   }

   deleteTag(id: string) {
      return this.delete(id);
   }
}

const tagService = new TagService();
export default tagService;
