import { useQuery, useQueryClient } from 'react-query';
import topicService from '../../../services/topic.service';
import authorService from '../../../services/author.service';
import tagService from '../../../services/tag.service';

function getActionForm() {
   const { data } = useQuery('AllData', async () => {
      const data = await Promise.all([topicService.getAll(), authorService.getAll(), tagService.getAll()]);
      console.log(data);
      return data;
   });

   return data;
}

export default getActionForm;
