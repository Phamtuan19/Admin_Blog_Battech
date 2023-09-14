import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import ERORR_VALIDATION from '../../../@Core/config/ErrorValidation';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import authorService from '../../services/author.service';
import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import Label from '../../../@Core/component/Label';
import ControlInput from '../../../@Core/component/ControllForm/ControlInput';

const schemaFrom = yup.object().shape({
   name: yup.string().required(`Tên chủ đề ${ERORR_VALIDATION.required}`),
});

type MySchema = yup.InferType<typeof schemaFrom>;

function EditAuthor() {
   const { authorId } = useParams();

   const { handleSubmit, control, reset, setValue } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
   });

   const {} = useQuery<any>(['getOneAuthor', authorId], async () => {
      try {
         if (authorId) {
            const res = await authorService.getOne(authorId);
            setValue('name', res.data.name);
         }
      } catch (error) {
         console.log(error);
      }
   });

   const onSubmitForm = async (data: MySchema) => {
      try {
         if (authorId) {
            await authorService.updateAuthor(authorId, data);
         }
      } catch (error) {
         console.log('Đã có lỗi xảy ra.');
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
            <form action="">
               <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 mb-3">
                     <Label htmlFor="name" required>
                        Tên tác giả
                     </Label>
                     <ControlInput fullWidth className="rounded-md" name="name" control={control} />
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}
export default EditAuthor;
