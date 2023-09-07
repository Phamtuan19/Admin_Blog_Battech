import React from 'react';
import cn from '../helpers/cn';

type TypeButtonProps = React.ComponentProps<'button'> & {
   size?: 'small' | 'normal' | 'large';
   fullWidth?: boolean;
   className?: string;
   children?: React.ReactNode;
};

function Button(props: TypeButtonProps) {
   const { size, fullWidth, className, children } = props;

   return (
      <button
         className={cn('bg-default rounded-default text-default text-white hover:shadow-default', className, {
            'p-small': size ? size === 'small' : true,
            'p-normal': size === 'normal',
            'p-large': size === 'large',
            'w-full': fullWidth,
         })}
      >
         {children}
      </button>
   );
}
export default Button;
