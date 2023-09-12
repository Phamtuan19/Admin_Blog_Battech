import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { images } from '../../../assets';
import Label from '../../../@Core/component/Label';
import Button from '../../../@Core/component/Button';
import ERORR_VALIDATION from '../../../@Core/config/ErrorValidation';
import ControlTextarea from '../../../@Core/component/ControllForm/ControlTextarea';
import ControlInput from '../../../@Core/component/ControllForm/ControlInput';
import ControlSelect from '../../../@Core/component/ControllForm/ControlSelect';
import changeToSlug from '../../../@Core/helpers/createSlug';
import { ErrorMessage } from '@hookform/error-message';
import ControlEditor from '../../../@Core/component/ControllForm/ControlEditor';
import { useQuery, useQueryClient } from 'react-query';
import postService from '../../services/posts.service';
import { getBase64 } from './utils';

const schemaFrom = yup.object().shape({
   name: yup.string().required(`Tên bài viết ${ERORR_VALIDATION.required}`),
   description: yup.string().required(`Mô tả bài viết ${ERORR_VALIDATION.required}`),
   content: yup.string().required(`Nội dung bài viết ${ERORR_VALIDATION.required}`),
   slug: yup.string().required(`Slug ${ERORR_VALIDATION.required}`),
   image: yup.mixed().required(`Hình ảnh ${ERORR_VALIDATION.required}`),
   topicId: yup.string().required(`Chủ đề ${ERORR_VALIDATION.required}`),
   authorId: yup.string().required(`Tác giả ${ERORR_VALIDATION.required}`),
   tagId: yup.string().required(`Tag ${ERORR_VALIDATION.required}`),
   publish: yup.string(),
});

type MySchema = yup.InferType<typeof schemaFrom>;

function CreatePost() {
   const {
      register,
      handleSubmit,
      setValue,
      watch,
      control,
      formState: { errors },
   } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
      defaultValues: {
         publish: '1',
      },
   });

   const queryClient = useQueryClient();

   const handleClickCreateSlug = () => {
      setValue('slug', changeToSlug(watch('name')));
   };

   const queryTopic = useQuery('getTopic', async () => {
      const res = await postService.getAllTopics();
      return res.data;
   });

   const queryAuthor = useQuery('getAuthor', async () => {
      const res = await postService.getAllAuthors();
      return res.data;
   });

   const queryTag = useQuery('getTags', async () => {
      const res = await postService.getAllTags();
      return res.data;
   });

   useEffect(() => {
      (async () => {
         await Promise.all([
            queryClient.getQueryData('getTopic'),
            queryClient.getQueryData('getAuthor'),
            queryClient.getQueryData('getTags'),
         ]);
      })();
   }, []);

   const onSubmitFrom = async (data: MySchema) => {
      try {
         const fileImage = await getBase64(data.image as File);
         
         const response = await postService.createPost({ ...data, image: fileImage });
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
               <img src={images.left} alt="" />
               <h1 className="text-2xl font-bold">Bài viết mới</h1>
            </div>
            <div className="flex gap-2">
               <ControlSelect
                  options={[
                     { id: '1', title: 'Publish', icon: images.check },
                     { id: '2', title: 'No Publish', icon: images.check },
                  ]}
                  keyValue="id"
                  keyTitle="title"
                  name="publish"
                  control={control}
               />

               <Button type="submit" onClick={handleSubmit(onSubmitFrom)} className="px-[10px] py-1">
                  Lưu bài viết
               </Button>
            </div>
         </div>
         <div className="mt-5">
            <form encType="multipart/form-data">
               <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-9">
                     <div className="bg-white">
                        <div className="grid grid-cols-12 gap-4 p-4">
                           <div className="col-span-6">
                              <Label htmlFor="email" className="text-[#393939] text-base" required>
                                 Tên bài viết
                              </Label>
                              <ControlTextarea className="rounded-lg min-h-[85px]" name="name" control={control} />
                           </div>
                           <div className="col-span-6">
                              <Label htmlFor="email" className="text-[#393939] text-base" required>
                                 Mô tả
                              </Label>
                              <ControlTextarea
                                 className="rounded-lg min-h-[85px]"
                                 name="description"
                                 control={control}
                              />
                           </div>
                           <div className="col-span-12">
                              <Label htmlFor="content" required>
                                 Nội dung
                              </Label>
                              <ControlEditor name="content" setValue={setValue} control={control} />
                           </div>
                           <div className="col-span-6">
                              <Label htmlFor="email" className="text-[#393939] text-base" required>
                                 Slug
                              </Label>
                              <div className="">
                                 <ControlInput
                                    fullWidth
                                    name="slug"
                                    className="rounded-lg"
                                    control={control}
                                    children={
                                       <div className="cursor-pointer" onClick={handleClickCreateSlug}>
                                          <img src={images.reload} alt="" />
                                       </div>
                                    }
                                 />
                              </div>
                           </div>
                           <div className="col-span-6">
                              <Label htmlFor="image" className="text-[#393939] text-base">
                                 Ảnh
                              </Label>
                              <div className="relative h-20">
                                 <input
                                    id="image"
                                    type="file"
                                    className="opacity-0 w-full h-full"
                                    name="image"
                                    {...register}
                                    onChange={(e) => {
                                       console.log();
                                       const file = e.target.files?.[0] as any;
                                       setValue('image', file);
                                    }}
                                 />
                                 <Label
                                    htmlFor="image"
                                    className="absolute top-0 left-0 right-0 bottom-0 border border-solid border-[#E3E5E8] rounded-lg"
                                 >
                                    <div className="h-full flex justify-center items-center cursor-pointer">
                                       <img src={images.upload} alt="" />
                                       <p>Click để tải ảnh</p>
                                    </div>
                                 </Label>
                              </div>
                              <ErrorMessage
                                 errors={errors}
                                 name="image"
                                 as={<p className="text-red-400 text-default ml-4" />}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-span-3">
                     <div className="bg-white border border-solid border-[#E3E5E8] rounded-lg">
                        <div className="px-3 py-[10px] border-b border-b-solid border-b-[#E3E5E8]  ">
                           <h1 className="font-bold">Thông tin</h1>
                        </div>
                        <div className="p-3 border-b border-b-solid border-b-[#E3E5E8]">
                           <div className="mb-3">
                              <Label htmlFor="chu-de" required>
                                 Chủ đề
                              </Label>
                              <ControlSelect
                                 options={queryTopic.data || []}
                                 keyValue="_id"
                                 keyTitle="name"
                                 name="topicId"
                                 control={control}
                              />
                           </div>
                           <div className="mb-3">
                              <Label htmlFor="chu-de" required>
                                 Tác giả
                              </Label>
                              <ControlSelect
                                 options={queryAuthor.data || []}
                                 keyValue="_id"
                                 keyTitle="name"
                                 name="authorId"
                                 control={control}
                              />
                           </div>
                           <div className="">
                              <Label htmlFor="chu-de" required>
                                 Tag
                              </Label>
                              <ControlSelect
                                 options={queryTag.data || []}
                                 keyValue="_id"
                                 keyTitle="name"
                                 name="tagId"
                                 control={control}
                              />
                           </div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                           <span>Ngày viết: </span>
                           <span>{format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreatePost;
