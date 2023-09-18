import React from 'react';
import Button from '../../../@Core/component/Button';
import { images } from '../../../assets';
import { useForm } from 'react-hook-form';
import { MySchema, schemaFrom } from './utils/YupFormAuthor';
import { yupResolver } from '@hookform/resolvers/yup';
import authorService from '../../services/author.service';
import BaseFormAuthor from './component/BaseFormAuthor';
import { useToastMessage } from '../../redux/slice/toastMessage.slice';

function CreateAuthor() {
   const { setToastMessage } = useToastMessage();

   const { handleSubmit, control, reset } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
      defaultValues: {
         name: '',
      },
   });

   const onSubmitForm = async (data: MySchema) => {
      try {
         await authorService.createAuthor(data);
         reset();
         setToastMessage('Thêm Tác giả thành công', 'success');
      } catch (error) {
         setToastMessage('Đã có lỗi xảy ra!!!', 'error');
      }
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
            <BaseFormAuthor control={control} />
         </div>
      </div>
   );
}

export default CreateAuthor;
