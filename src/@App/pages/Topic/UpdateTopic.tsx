import { useParams } from 'react-router-dom';
import topicService from '../../services/topic.service';
import { useForm } from 'react-hook-form';
import { MySchema, schemaFrom } from './utils/formTopic';
import { yupResolver } from '@hookform/resolvers/yup';
import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import BaseFormTopic from './component/BaseFormTopic';

function UpdateTopic() {
   const { topicId } = useParams();

   const { handleSubmit, control, watch, setValue } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
      defaultValues: async () => {
         try {
            if (topicId) {
               const res = await topicService.getOne(topicId);
               return res.data;
            }
         } catch (error) {
            console.log('Error get data' + error);
         }
      },
   });

   const onSubmitForm = async (data: MySchema) => {
      try {
         if (topicId) {
            const res = await topicService.updateTopic(topicId, data);
            console.log(res);
         }
      } catch (error) {
         console.log('đã có lỗi xảy ra');
      }
   };

   return (
      <div className="">
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
               <img src={images.left} alt="" />
               <h1 className="text-2xl font-bold">Chỉnh sửa chủ đề</h1>
            </div>
            <div className="">
               <Button type="submit" className="px-[10px] py-1" onClick={handleSubmit(onSubmitForm)}>
                  Lưu
               </Button>
            </div>
         </div>

         <div className="bg-white mt-5 p-4">
            <BaseFormTopic control={control} setValue={setValue} watch={watch} />
         </div>
      </div>
   );
}

export default UpdateTopic;
