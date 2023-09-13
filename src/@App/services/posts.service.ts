import BaseService from '../../@Core/Api/BaseService';

class PostService extends BaseService {
   BASE_ENDPOINT = 'posts';

   getAllPosts() {
      return this.get();
   }

   createPost(data: any) {
      return this.request.post(this.BASE_ENDPOINT + '/create', data);
   }

   getAllTopics() {
      return this.request.get(this.BASE_ENDPOINT + '/topic');
   }

   createTopic(data: { name: string; slug: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/topic/create', data);
   }

   getAllAuthors() {
      return this.request.get(this.BASE_ENDPOINT + '/author');
   }

   createAuthor(data: { name: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/author/create', data);
   }

   getAllTags() {
      return this.request.get(this.BASE_ENDPOINT + '/tags');
   }

   createTag(data: { name: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/tags/create', data);
   }
}

const postService = new PostService();

export default postService;
