import React, { useState } from 'react';
import Button from '../../../../../@Core/component/Button';
import cn from '../../../../../@Core/helpers/cn';

export type TypeDropdownOptions = Array<{
   value: string;
   title: string;
}>;

interface TypeFilter {
   options: TypeDropdownOptions;
   defaultValue: string;
   image?: string;
   callback?: Function | React.Dispatch<React.SetStateAction<string | null>>;
}

function Dropdown(props: TypeFilter) {
   const { options, defaultValue, image, callback } = props;

   const [value, setValue] = useState<string>(defaultValue);

   return (
      <div className="relative group">
         <Button className="bg-white border border-solid border-[#9D9D9D] text-black flex items-center gap-2">
            <img src={image} alt="" />
            <span className="text-sm">{value}</span>
         </Button>
         <div
            className={cn('absolute top-[101%] right-0 w-32 z-[500] bg-white py-3 rounded-lg hidden group-hover:block')}
            style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
         >
            {options.map((action: { value: string; title: string }, index: number) => {
               return (
                  <div
                     className="py-2 px-4 hover:bg-[#E3E5E8] cursor-pointer"
                     key={index}
                     onClick={() => {
                        setValue(action.title);
                        callback && callback(action.value);
                     }}
                  >
                     {action.title}
                  </div>
               );
            })}
         </div>
      </div>
   );
}
export default React.memo(Dropdown);
