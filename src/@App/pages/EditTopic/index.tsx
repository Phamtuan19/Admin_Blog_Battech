import React, { useEffect } from 'react';
import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import Label from '../../../@Core/component/Label';
import ControlInput from '../../../@Core/component/ControllForm/ControlInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ERORR_VALIDATION from '../../../@Core/config/ErrorValidation';
import changeToSlug from '../../../@Core/helpers/createSlug';
import topicService from '../../services/topic.service';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const schemaFrom = yup.object().shape({
   name: yup.string().required(`Tên chủ đề ${ERORR_VALIDATION.required}`),
   slug: yup.string().required(`Slug ${ERORR_VALIDATION.required}`),
});

type MySchema = yup.InferType<typeof schemaFrom>;

function EditTopic() {
   const { topicId } = useParams();
   const { data: currentTopic, isFetching } = useQuery('getOneTopic', async () => {
      try {
         if (topicId) {
            const res = await topicService.getOne(topicId);
            return res.data;
         }
      } catch (error) {
         console.log(error);
      }
   });

   const { handleSubmit, control, watch, setValue } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
      defaultValues: {
         name: currentTopic?.name,
         slug: currentTopic?.slug,
      },
   });

   useEffect(() => {
      if (currentTopic) {
         setValue('name', currentTopic.name);
         setValue('slug', currentTopic.slug);
      }
   }, [currentTopic]);

   const handleClickCreateSlug = () => {
      setValue('slug', changeToSlug(watch('name')));
   };

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
         {!isFetching ? (
            <>
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
            </>
         ) : (
            <h1>loading...</h1>
         )}
      </div>
   );
}
export default EditTopic;
