import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import { MySchema, schemaFrom } from './utils/FormTag';
import tagService from '../../services/tag.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormTag from './component/BaseFormTag';

function CreateTag() {
   const { handleSubmit, control } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
   });

   const onSubmitForm = async (data: MySchema) => {
      try {
         const res = await tagService.createTag(data);
         console.log(res);
      } catch (error) {}
   };

   return (
      <div className="">
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
               <img src={images.left} alt="" />
               <h1 className="text-2xl font-bold">Thêm Tag mới</h1>
            </div>
            <div className="">
               <Button type="submit" className="px-[10px] py-1" onClick={handleSubmit(onSubmitForm)}>
                  Lưu
               </Button>
            </div>
         </div>

         <div className="mt-5">
            <BaseFormTag control={control} />
         </div>
      </div>
   );
}

export default CreateTag;
