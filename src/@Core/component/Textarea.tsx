import React, { forwardRef } from 'react';
import cn from '../helpers/cn';

interface TypeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   size?: 'small' | 'normal';
   fullWidth?: boolean;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
}

const Textarea = forwardRef<HTMLInputElement, TypeProps>((props, ref) => {
   const { size, fullWidth, className, ...prop } = props;

   return (
      <div
         className={cn('border border-solid border-[#D9D9D9] ', className, {
            'p-small': size ? size === 'small' : true,
            'p-normal': size === 'normal',
            'w-full': fullWidth,
         })}
      >
         <textarea
            className={cn('w-full outline-none block h-full')}
            {...prop}
            style={{ width: '100%', height: '100%' }}
         />
      </div>
   );
});
export default Textarea;
