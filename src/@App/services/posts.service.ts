import BaseService from '../../@Core/Api/BaseService';

class PostService extends BaseService {
   BASE_ENDPOINT = 'posts';

   getAllPosts(data?: any) {
      return this.get(data);
   }

   createPost(data: any) {
      return this.request.post(this.BASE_ENDPOINT + '/create', data);
   }

   findOnePost(id: string) {
      return this.find(id);
   }

   deletePost(id: string) {
      return this.request.delete(this.BASE_ENDPOINT + '/' + id);
   }

   updatePost(id: string, data: any) {
      return this.update(data, id);
   }
}

const postService = new PostService();

export default postService;
