import BaseService from '../../@Core/Api/BaseService';

class TopicService extends BaseService {
   BASE_ENDPOINT = 'topic';

   getAllTopics(data: any) {
      return this.request.get(this.BASE_ENDPOINT + '/all', { params: data });
   }

   createTopic(data: { name: string; slug: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/create', data);
   }

   deleteTopic(id: string) {
      return this.delete(id);
   }

   getOne(id: string) {
      return this.find(id);
   }

   updateTopic(id: string, data: any) {
      return this.update(data, id);
   }
}

const topicService = new TopicService();

export default topicService;
