import React from 'react';
import cn from '../helpers/cn';

interface TypeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   CTSize?: 'small' | 'normal';
   fullWidth?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
}

function Input(props: TypeInputProps) {
   const { CTSize, fullWidth, className, ...prop } = props;

   return (
      <div
         className={cn('border border-solid border-[#D9D9D9] w-boxInput', className, {
            'p-small': CTSize ? CTSize === 'small' : true,
            'p-normal': CTSize === 'normal',
            'w-full': fullWidth,
         })}
      >
         <input type="text" className={cn('w-full h-input outline-none block ')} {...prop} />
      </div>
   );
}

export default React.memo(Input);
