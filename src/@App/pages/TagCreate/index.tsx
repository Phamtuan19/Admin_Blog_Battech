import React from 'react';
import Button from '../../../@Core/component/Button';
import { images } from '../../../assets';
import Label from '../../../@Core/component/Label';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ControlInput from '../../../@Core/component/ControllForm/ControlInput';
import ERORR_VALIDATION from '../../../@Core/config/ErrorValidation';
import postService from '../../services/posts.service';

const schemaFrom = yup.object().shape({
   name: yup.string().required(`Tên chủ đề ${ERORR_VALIDATION.required}`),
});

type MySchema = yup.InferType<typeof schemaFrom>;

function TagCreate() {
   const { handleSubmit, control, watch, setValue } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
   });

   const onSubmitForm = async (data: MySchema) => {
      try {
         const res = await postService.createTag(data);
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
         <div className="bg-white mt-5 p-4">
            <form action="">
               <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 mb-3">
                     <Label htmlFor="name" required>
                        Tên chủ đề
                     </Label>
                     <ControlInput fullWidth className="rounded-md" name="name" control={control} />
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}

export default TagCreate;
