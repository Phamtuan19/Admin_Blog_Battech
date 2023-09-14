import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import ControlSelect from '../../../@Core/component/ControllForm/ControlSelect';
import ERORR_VALIDATION from '../../../@Core/config/ErrorValidation';
import FormPost from './component/FormPost';
import { getBase64 } from './utils';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import postService from '../../services/posts.service';

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

function EditPost() {
   const { postId } = useParams();

   const {
      data: dataPost,
      isFetched,
      refetch,
   } = useQuery<any>('getPostItem', async () => {
      try {
         if (postId) {
            const res = await postService.findOnePost(postId);
            console.log(res);
            return res;
         }
      } catch (error) {
         console.log(error);
      }
   });

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      control,
      reset,
      formState: { errors },
   } = useForm<MySchema>({
      resolver: yupResolver(schemaFrom),
      defaultValues: {
         publish: '1',
      },
   });

   useEffect(() => {
      if (dataPost && dataPost.post) {
         setValue('name', dataPost.post.name);
         setValue('description', dataPost.post.description);
         setValue('content', dataPost.post.content);
         setValue('slug', dataPost.post.slug);
         setValue('topicId', dataPost.post.topicId._id);
         setValue('authorId', dataPost.post.authorId._id);
         setValue('tagId', dataPost.post.tagId._id);
         setValue('publish', dataPost.post.publish || 1);
         setValue('image', dataPost.post.image || 1);
      }
   }, [dataPost]);

   const onSubmitFrom = async (data: MySchema) => {
      try {
         if (postId) {
            let newImage;
            if (dataPost.post.image !== data.image) {
               const fileImage = await getBase64(data.image as File);
               newImage = fileImage;
            } else {
               newImage = data.image;
            }

            const response = await postService.updatePost(postId, { ...data, image: newImage });
            refetch();
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         {!isFetched ? (
            <h1>...Loading</h1>
         ) : (
            <>
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
                  <FormPost
                     register={register}
                     handleSubmit={handleSubmit}
                     setValue={setValue}
                     watch={watch}
                     control={control}
                     reset={reset}
                     errors={errors}
                     image={dataPost?.image}
                  />
               </div>
            </>
         )}
      </div>
   );
}

export default EditPost;
