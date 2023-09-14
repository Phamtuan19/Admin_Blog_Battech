import { forwardRef, SelectHTMLAttributes } from 'react';
import cn from '../helpers/cn';

export interface TypeSelect extends SelectHTMLAttributes<HTMLSelectElement> {
   CTSize?: 'small' | 'normal';
   fullWidth?: boolean;
   className?: string;
   options: { [key: string]: any }[];
   keyValue: string;
   keyTitle: string;
}

const Select = forwardRef<HTMLSelectElement, TypeSelect>((props, _ref) => {
   const { CTSize, fullWidth, className, options, keyValue, keyTitle, ...rest } = props;
   return (
      <div
         className={cn('border border-solid border-[#D9D9D9] rounded-lg ', className, {
            'w-full': fullWidth,
         })}
      >
         <select
            className={cn('w-full outline-none rounded-lg ', {
               'p-small': CTSize ? CTSize === 'small' : true,
               'p-normal': CTSize === 'normal',
            })}
            {...rest}
         >
            <option value="">--- Chọn ---</option>
            {options &&
               options.map((option, index) => {
                  return (
                     <option key={index} value={option[keyValue]}>
                        {option[keyTitle] || ''}
                     </option>
                  );
               })}
         </select>
      </div>
   );
});

export default Select;
