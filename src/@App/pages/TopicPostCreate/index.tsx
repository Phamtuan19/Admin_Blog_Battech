import React from 'react';
import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import Label from '../../../@Core/component/Label';
import ControlInput from '../../../@Core/component/ControllForm/ControlInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ERORR_VALIDATION from '../../../@Core/config/ErrorValidation';
import changeToSlug from '../../../@Core/helpers/createSlug';
import postService from '../../services/posts.service';

const schemaFrom = yup.object().shape({
   name: yup.string().required(`Tên chủ đề ${ERORR_VALIDATION.required}`),
   slug: yup.string().required(`Slug ${ERORR_VALIDATION.required}`),
});

type MySchema = yup.InferType<typeof schemaFrom>;

function TopicPostCreate() {
   const { handleSubmit, control, watch, setValue } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
   });

   const handleClickCreateSlug = () => {
      setValue('slug', changeToSlug(watch('name')));
   };

   const onSubmitForm = async (data: MySchema) => {
      try {
         const res = await postService.createTopic(data);
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
            <form action="">
               <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 mb-3">
                     <Label htmlFor="name" required>
                        Tên chủ đề
                     </Label>
                     <ControlInput fullWidth className="rounded-md" name="name" control={control} />
                  </div>
                  <div className="col-span-6 mb-3">
                     <Label htmlFor="email" className="text-[#393939] text-base" required>
                        Slug
                     </Label>
                     <div className="">
                        <ControlInput
                           fullWidth
                           name="slug"
                           className="rounded-md"
                           control={control}
                           children={
                              <div className="cursor-pointer" onClick={handleClickCreateSlug}>
                                 <img src={images.reload} alt="" />
                              </div>
                           }
                        />
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}
export default TopicPostCreate;
