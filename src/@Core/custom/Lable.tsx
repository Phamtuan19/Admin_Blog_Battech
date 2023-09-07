import React from 'react';
import cn from '../helpers/cn';

interface TypeLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
   id?: string;
   className?: string;
   children?: React.ReactNode;
}

function Lable(props: TypeLabel) {
   const { id, className, children } = props;

   return (
      <div className={cn('mb-1', className)}>
         <label htmlFor={id}>{children}</label>
      </div>
   );
}
export default React.memo(Lable);
