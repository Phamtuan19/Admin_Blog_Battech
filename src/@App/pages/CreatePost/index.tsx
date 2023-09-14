import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import ControlSelect from '../../../@Core/component/ControllForm/ControlSelect';
import ERORR_VALIDATION from '../../../@Core/config/ErrorValidation';
import FormPost from './component/FormPost';
import { getBase64 } from './utils';
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

function CreatePost() {
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

   const onSubmitFrom = async (data: MySchema) => {
      try {
         const fileImage = await getBase64(data.image as File);

         await postService.createPost({ ...data, image: fileImage });
         reset();
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
            <FormPost
               register={register}
               handleSubmit={handleSubmit}
               setValue={setValue}
               watch={watch}
               control={control}
               reset={reset}
               errors={errors}
            />
         </div>
      </div>
   );
}

export default CreatePost;
