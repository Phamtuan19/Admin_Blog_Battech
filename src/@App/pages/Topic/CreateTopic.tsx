
import { useForm } from 'react-hook-form';
import { MySchema, schemaFrom } from './utils/formTopic';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../@Core/component/Button';
import { images } from '../../../assets';
import BaseFormTopic from './component/BaseFormTopic';
import topicService from '../../services/topic.service';

function CreateTopic() {
   const { handleSubmit, control, watch, setValue } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
   });

   const onSubmitForm = async (data: MySchema) => {
      try {
         const res = await topicService.createTopic(data);
         console.log(res);
      } catch (error) {}
   };

   return (
      <div className="">
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
               <img src={images.left} alt="" />
               <h1 className="text-2xl font-bold">Thêm chủ đề</h1>
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

export default CreateTopic;
