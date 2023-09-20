import React, { useState, useCallback, useRef, useEffect } from 'react';
import cn from '../../../helpers/cn';
import Input from '../../Input';
import SelectItemActive, { CloseItem } from './components/SelectItemActive';
import onClickOutside from '../../../../@App/Hoc/onClickOutside';

export interface MultiselectProps {
   name: string;
   fullWidth?: boolean;
   className?: string;
   options: { [key: string]: any }[];
   _value: string;
   _id: string;
   defaultValue?: string[];
   placeholder?: string;
   setValue?: any;
}

function Multiselect(props: MultiselectProps) {
   const {
      name,
      fullWidth,
      className,
      options,
      _id,
      _value,
      defaultValue,
      placeholder,
      setValue: setValueHookForm,
   } = props;

   const [optionActive, setOptionActive] = useState<string[]>(defaultValue || []);
   console.log(defaultValue);
   const [open, setOpen] = useState<boolean>(false);
   const [value, setValue] = useState<string>('');

   const wrapperRef = useRef<HTMLInputElement>(null);
   onClickOutside({ wrapperRef, setOpen });

   const handleClickDeleteItemActive = (id: string) => {
      setOptionActive((prev: string[]) => prev.filter((item: string) => item !== id));
   };

   useEffect(() => {
      setValueHookForm(name, optionActive);
   }, [optionActive]);

   // render list Option Active
   const handleRenderOptinActive = () => {
      const result = options?.filter((option: { [key: string]: any }) => optionActive.includes(option[_id]));
      return result?.map((option: { [key: string]: any }) => {
         return (
            <SelectItemActive
               key={option[_id]}
               item={option}
               _id={_id}
               _value={_value}
               onClick={handleClickDeleteItemActive}
            />
         );
      });
   };

   // Click active active item
   const handleClickActiveSelectItem = (id: string) => {
      setOptionActive((prev: string[]) => {
         if (!prev.includes(id)) {
            return [...prev, id];
         }
         return [...prev];
      });
   };

   // search tìm kiếm các Item
   const handleChangeQueryOption = useCallback(() => {
      const result = options?.filter((option: any) => {
         return option[_value].toLocaleLowerCase().indexOf(value) > -1;
      });
      return result?.map((option: { [key: string]: any }) => {
         return (
            <div
               key={option[_id]}
               className="py-2 px-3 hover:bg-[#F5F6F7] rounded-lg cursor-pointer"
               onClick={() => handleClickActiveSelectItem(option[_id])}
            >
               {option[_value]}
            </div>
         );
      });
   }, [open, value]);

   return (
      <div
         className={cn('border border-solid border-[#D9D9D9] rounded-lg relative', className, {
            'w-full': fullWidth,
         })}
      >
         <div className="w-full ">
            <div className="relative pr-12">
               <div className="">
                  <div className="flex flex-wrap">{handleRenderOptinActive()}</div>
                  <Input
                     ref={wrapperRef}
                     fullWidth
                     className="border-0"
                     value={value}
                     placeholder={placeholder}
                     onClick={() => setOpen(true)}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value.toLocaleLowerCase())}
                  />
               </div>
               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center ">
                  {optionActive.length >= 2 && (
                     <div className="" onClick={() => setOptionActive([])}>
                        <CloseItem />
                     </div>
                  )}
                  <DropDownMultiSelect />
               </div>
            </div>
         </div>
         {open && (
            <div className="absolute w-full bottom left-0">
               <div className="px-2 py-3 bg-white rounded-lg shadow-default">{handleChangeQueryOption()}</div>
            </div>
         )}
      </div>
   );
}
{
   /* <SelectItemActive /> */
}
const DropDownMultiSelect = () => {
   return (
      <div className="">
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
            <path d="m14 20 10 10 10-10z" />
            <path fill="none" d="M0 0h48v48H0z" />
         </svg>
      </div>
   );
};

export default Multiselect;
