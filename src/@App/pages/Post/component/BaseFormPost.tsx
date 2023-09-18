
import Label from '../../../../@Core/component/Label';
import ControlTextarea from '../../../../@Core/component/ControllForm/ControlTextarea';
import ControlEditor from '../../../../@Core/component/ControllForm/ControlEditor';
import ControlInput from '../../../../@Core/component/ControllForm/ControlInput';
import { images } from '../../../../assets';
import { ErrorMessage } from '@hookform/error-message';
import ControlSelect from '../../../../@Core/component/ControllForm/ControlSelect';
import changeToSlug from '../../../../@Core/helpers/createSlug';
import { format } from 'date-fns';
import getActionForm from '../utils/getActionForm';

export default function BaseFormPost(props: any) {
   const { register, setValue, watch, control, errors } = props;

   const dataActionForm = getActionForm();

   console.log(dataActionForm?.[0]);

   const handleClickCreateSlug = () => {
      setValue('slug', changeToSlug(watch('name')));
   };

   return (
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
                        <ControlTextarea className="rounded-lg min-h-[85px]" name="description" control={control} />
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
                           options={dataActionForm?.[0].data || []}
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
                           options={dataActionForm?.[1].data.data || []}
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
                           options={dataActionForm?.[2].data.data || []}
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
   );
}
