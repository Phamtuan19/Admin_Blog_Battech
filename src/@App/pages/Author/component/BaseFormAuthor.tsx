import Label from '../../../../@Core/component/Label';
import ControlInput from '../../../../@Core/component/ControllForm/ControlInput';
import { Control } from 'react-hook-form';
import { MySchema } from '../utils/YupFormAuthor';

interface CreateAuthorProps {
   control: Control<MySchema>;
}

function BaseFormAuthor(props: CreateAuthorProps) {
   const { control } = props;
   return (
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
   );
}

export default BaseFormAuthor;
