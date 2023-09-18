import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getBase64, schemaFrom } from './utils/FormPost';
import postService from '../../services/posts.service';
import { images } from '../../../assets';
import ControlSelect from '../../../@Core/component/ControllForm/ControlSelect';
import Button from '../../../@Core/component/Button';
import BaseFormPost from './component/BaseFormPost';

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
            <BaseFormPost
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
