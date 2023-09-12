import React, { forwardRef } from 'react';
import cn from '../helpers/cn';

export interface TypeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   CTSize?: 'small' | 'normal';
   fullWidth?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
   children?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, TypeInputProps>((props, ref) => {
   const { CTSize, fullWidth, className, children, ...prop } = props;

   return (
      <div
         className={cn('border border-solid border-[#D9D9D9] w-boxInput flex', className, {
            'p-small': CTSize ? CTSize === 'small' : true,
            'p-normal': CTSize === 'normal',
            'w-full': fullWidth,
         })}
      >
         <input ref={ref} className={cn('w-full  outline-none block ')} {...prop} />
         {children}
      </div>
   );
});

export default React.memo(Input);
