import Button from '../../../@Core/component/Button';
import { images } from '../../../assets';
import { MySchema, schemaFrom } from './utils/YupFormAuthor';
import { useParams } from 'react-router-dom';
import authorService from '../../services/author.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormAuthor from './component/BaseFormAuthor';

function UpdateAuthor() {
   const { authorId } = useParams();

   const { handleSubmit, control } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
      defaultValues: async () => {
         try {
            if (authorId) {
               const res = await authorService.getOne(authorId);
               return res.data;
            }
         } catch (error) {
            console.log('Error get Author: ' + error);
         }
      },
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
               <h1 className="text-2xl font-bold">Chỉnh sửa Tác giả</h1>
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

export default UpdateAuthor;
