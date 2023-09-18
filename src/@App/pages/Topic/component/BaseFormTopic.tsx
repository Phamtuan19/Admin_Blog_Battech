import Label from '../../../../@Core/component/Label';
import ControlInput from '../../../../@Core/component/ControllForm/ControlInput';
import { images } from '../../../../assets';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import changeToSlug from '../../../../@Core/helpers/createSlug';
import { MySchema } from '../utils/formTopic';

interface CreateTopicProps {
   control: Control<MySchema>;
   setValue: UseFormSetValue<MySchema>;
   watch: UseFormWatch<MySchema>;
}

function BaseFormTopic(props: CreateTopicProps) {
   const { control, setValue, watch } = props;

   const handleClickCreateSlug = () => {
      setValue('slug', changeToSlug(watch('name')));
   };

   return (
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
   );
}

export default BaseFormTopic;
