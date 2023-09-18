import { yupResolver } from '@hookform/resolvers/yup';

import Label from '../../../../@Core/component/Label';
import ControlInput from '../../../../@Core/component/ControllForm/ControlInput';
import { Control } from 'react-hook-form';

interface TypeControlInput {
   control: Control<any>;
}

function BaseFormTag(props: TypeControlInput) {
   const { control } = props;
   return (
      <div className="">
         <div className="bg-white mt-5 p-4">
            <form action="">
               <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 mb-3">
                     <Label htmlFor="name" required>
                        Tên chủ đề
                     </Label>
                     <ControlInput fullWidth className="rounded-md" name="name" control={control} />
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}

export default BaseFormTag;
