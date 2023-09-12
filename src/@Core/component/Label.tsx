import React from 'react';
import cn from '../helpers/cn';

interface TypeLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
   htmlFor?: string;
   className?: string;
   required?: boolean;
   children?: React.ReactNode;
}

function Label(props: TypeLabel) {
   const { htmlFor, className, required, children, ...prop } = props;

   return (
      <div className={cn('mb-1', className)}>
         <label htmlFor={htmlFor} {...prop}>
            {children}
            {required && <span className="text-[#E32D1C]">*</span>}
         </label>
      </div>
   );
}
export default React.memo(Label);
